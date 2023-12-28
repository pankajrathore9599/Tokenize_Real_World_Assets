
import Web3 from 'web3';

// ABIs
import ETH_ABI from '../blockchain/contracts/abis/ERC20-TokenFactory.json';
import BSC_ABI from '../blockchain/contracts/abis/BEP20-TokenFactory.json';
import POLYGON_ABI from '../blockchain/contracts/abis/POLYGON-TokenFactory.json';

const getContractInstance = (blockchain) => {
  const network = blockchain.toLowerCase();
  let web3Instance, abi, contractAddress, privateKey;

  switch (network) {
    case 'ethereum':
      web3Instance = new Web3(process.env.ETH_GOERLI_TESTNET_RPC);
      abi = ETH_ABI;
      contractAddress = process.env.ETH_ERC20_TOKEN_FACTORY_CONTRACT_ADDRESS;
      privateKey = process.env.GOERLI_TESTNET_PRIVATE_KEY;
      break;
    case 'bsc':
      web3Instance = new Web3(process.env.BSC_TESTNET_RPC);
      abi = BSC_ABI;
      contractAddress = process.env.BSC_BEP20_TOKEN_FACTORY_CONTRACT_ADDRESS;
      privateKey = process.env.BSC_TESTNET_PRIVATE_KEY;
      break;
    case 'polygon':
      web3Instance = new Web3(process.env.POLYGON_TESTNET_RPC);
      abi = POLYGON_ABI;
      contractAddress = process.env.POLYGON_TOKEN_FACTORY_CONTRACT_ADDRESS;
      privateKey = process.env.POLYGON_TESTNET_PRIVATE_KEY;
      break;
    
    default:
      throw new Error('Unsupported blockchain');
  }

  const contract = new web3Instance.eth.Contract(abi, contractAddress);
  return { contract, privateKey, web3: web3Instance };
};

export { getContractInstance };
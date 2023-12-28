import Web3 from 'web3';

const getWeb3Instance = (blockchain) => {
  let web3Provider;

  switch (blockchain.toLowerCase()) {
    case 'ethereum':
      web3Provider = process.env.ETH_GOERLI_TESTNET_RPC;
      break;
    case 'bsc':
      web3Provider = process.env.BSC_TESTNET_RPC;
      break;
    case 'polygon':
      web3Provider = process.env.POLYGON_TESTNET_RPC;
      break;
    default:
      throw new Error('Unsupported blockchain');
  }

  return new Web3(web3Provider);
};

export { getWeb3Instance };

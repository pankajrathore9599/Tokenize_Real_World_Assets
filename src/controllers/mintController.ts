import { getContractInstance } from '../utils/getContractInstance.js';
import { getWeb3Instance } from '../utils/web3.js';

const mintToken = async (req, res) => {
  const { name, symbol, decimals, initialSupply, assetType, blockchain } = req.body;
  const privateKeyEnvName = `${blockchain.toUpperCase()}_TESTNET_PRIVATE_KEY`;
  const privateKey = process.env[privateKeyEnvName];

  if (!privateKey || privateKey.length === 0) {
    return res.status(500).send(`The private key for ${blockchain} is not set in the environment.`);
  }


  const privateKeyPattern = /^[0-9a-fA-F]{64}$/;
  if (!privateKeyPattern.test(privateKey)) {
    return res.status(500).send("Invalid private key format.");
  }

  try {
    const web3Instance = getWeb3Instance(blockchain); 
    const { contract } = getContractInstance(blockchain); 

    const account = web3Instance.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3Instance.eth.accounts.wallet.add(account);

    const createTokenMethod = contract.methods.createToken(
      name,
      symbol,
      decimals,
      web3Instance.utils.toWei(initialSupply.toString(), 'ether'),
      assetType
    );

    const nonce = await web3Instance.eth.getTransactionCount(account.address, 'latest');

    const gas = await createTokenMethod.estimateGas({ from: account.address });
    const gasPrice = await web3Instance.eth.getGasPrice();

    const signedTx = await web3Instance.eth.accounts.signTransaction(
      {
        to: contract.options.address,
        data: createTokenMethod.encodeABI(),
        gas,
        gasPrice,
        nonce, 
      },
      '0x' + privateKey
    );

    const receipt = await web3Instance.eth.sendSignedTransaction(signedTx.rawTransaction);

    res.json({ message: 'Asset created successfully', transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error('Error minting tokens:', error);
    res.status(500).send(`Error minting tokens: ${error.message}`);
  }
};

export { mintToken };

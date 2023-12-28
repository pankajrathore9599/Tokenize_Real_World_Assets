import Web3 from 'web3';

const web3Provider = process.env.POLYGON_TESTNET_RPC;

// Check if the web3Provider is defined before initializing Web3
const web3 = web3Provider ? new Web3(web3Provider) : null;

export default web3;

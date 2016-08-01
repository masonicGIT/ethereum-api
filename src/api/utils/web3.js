import Web3 from 'web3'

const web3 = new Web3()
const provider = new web3.providers.HttpProvider(process.env.WEB3_PROVIDER || 'http://localhost:8545')

web3.setProvider(provider);

export default web3
const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const userData = require('../build/contracts/userData.json');
const dev_data = require('../constants');

const userContracts = async(address) => {

    const provider = new hdWalletProvider(
        dev_data.priv_key,
        dev_data.ropsten_url
    );
    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
        userData.abi,
        dev_data.contract_address
    )

    let contracts = await contract.methods.getContractAddress(address).call();
    return contracts;

}
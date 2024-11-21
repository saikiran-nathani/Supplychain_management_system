const hdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const userData = require('../build/contracts/userData.json');

const dev_data = require('../constants');

const provider = new hdWalletProvider(
    dev_data.priv_key,
    dev_data.ropsten_url
    //"https://ropsten.infura.io/v3/d1ed4d59de6b4faa878a943d8553d956"
);
const web3 = new Web3(provider);
let contract = new web3.eth.Contract(
    userData.abi,
    dev_data.contract_address
)

const signIn = async(req, res) => {
    const { address, name, mobile_no } = req.body;

    if(!name || !address || !mobile_no){
        return res.status(400).json({
            error: true,
            message: "Data not provided"
         })
    }

    let val = await contract.methods.findUser(address).call();
    console.log(val);
    if(val[0] != '1'){
        await contract.methods.createUser(address, name, mobile_no).send({
            from: dev_data.account_address,
        }).then(function(receipt){
            return res.status(200).json({
                err: false,
                msg: "User created successfully",
                receipt: receipt
            })
        });
    }else{
        return res.status(200).json({
            err: false,
            msg: "User already exists",
            value: {
                name: val[1],
                mobile_no: val[2],
                account_address: val[3],
                contracts: val[4]
            }
        })
    }
}

module.exports = signIn;
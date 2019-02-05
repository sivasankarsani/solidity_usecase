const Web3 = require('web3');
const Tx = require('ethereumjs-tx')
// rinkeby walletprovider
const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = "spawn ten shop scrap attitude second spoon animal tomorrow can quote ahead";

// gettign infura network
const accessToken ="https://rinkeby.infura.io/v3/590dae5d9e594b7dbe2f11c75931bcf7";

const contractAddress = "0x1964Ad5F35d039535aEb22E152617aC4fe8de26C";

//const provider =  new HDWalletProvider(mnemonic,accessToken)

const web3 = new Web3 (new Web3.providers.HttpProvider(accessToken))

// web3.setProvider(new web3.providers.HttpProvider(new HDWalletProvider(mnemonic,accessToken)))

const addressFrom = '0x8F239aa43d07FAD3A1676f901ed306Bea0dB77c7';

const private_key = new Buffer.from('7DE22866CFEF1D15E6BDD123D28A7EFB99ABDAD214FAF59D76B065FE04E25A74','hex');

const contractJSON = require('../Get_Fetch//build/contracts/MedicalReceipt.json')

const abi = contractJSON.abi;

const contract =  new web3.eth.Contract(abi,contractAddress);


exports.getPatientData = function (req,res) {
    console.log("shvsdb",req)
    contract.methods.getPatientLatestMedicalReceipt(req.params.address).call()
    .then( (result, error) => {
        if(result) {
            res.json({
                "PatientReceipt" : result[0]
            })
        }
        else {
            res.json({
                "error" : error
            })
        }
    })
    .catch((error) => console.log(error))

}
 function sendSigned(txData, cb) {
    const transaction = new Tx(txData)
    transaction.sign(private_key)
    const serializedTx = transaction.serialize().toString('hex')
    web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
  }

  exports.setPatientData = function(req,res){ 
      web3.eth.getTransactionCount(req.body.address).then(txCount => {
        const txData = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(250000),
          gasPrice: web3.utils.toHex(web3.utils.toWei('41','gwei')), 
          to: contractAddress,
          from: addressFrom,
          value: 0x0,
          data: contract.methods.setPatientMedicalReceipt(req.body.prescription,req.body.doctor,req.body.hospital).encodeABI()
        }
      
        // fire away!
        sendSigned(txData, function(err, result) {
          if (err) {
              res.json({
                  "status": 204,
                  "error":"error"
              })
            }
            else{
                res.json({
                    "status":200,
                    "":txData
                })
            }
        })
      
    })
  }

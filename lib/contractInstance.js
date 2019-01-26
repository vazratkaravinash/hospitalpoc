const Web3 = require('web3');
const config = require('../config/contract.json');
const contractAddress = require('../config/contractAddress.json');

function smartContractInstance(cb) {
    var web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    if (web3.isConnected()) {
        web3.personal.unlockAccount(web3.eth.accounts[0],"",20, function(errUnlock, resUnlock){
            if(errUnlock){
                cb("Error in unlocking");
            }
            else {
                
                var myContract =  web3.eth.contract(contractAddress.hospitalContractAddress.abi).at(contractAddress.hospitalContractAddress.address);  
                console.log("Successfully created contract instance");
                cb(null, myContract);
            }
        })
        
    } else {
        cb("Unable to create contract instance");
    }
}

module.exports = {
    smartContractInstance 
}

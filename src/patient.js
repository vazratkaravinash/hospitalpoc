const contractInstance = require('../lib/contractInstance');
const Web3 = require('web3');
const config = require('../config/contract.json')
var web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));

/**
 * This function will add doctor information on blockchain
 * @param {object} patientInfo 
 * @param {callback} cb 
 */
function addPatient(patientInfo, cb) {
    contractInstance.smartContractInstance(function(errContract, instance){
        if(!errContract){
            console.log("here",web3.eth.coinbase);
            instance.isPatientAdded(patientInfo.patientId,{ gas: 4000000, from: web3.eth.coinbase },function (errD, resD) {
                if (resD) {
                    cb("Please use another patient ID");
                }
                else {
                    instance.addPatient(patientInfo.patientId, patientInfo.patientName, patientInfo.patientEmail, patientInfo.patientContact, patientInfo.patientAddress, patientInfo.doctorId, { gas: 4000000, from: web3.eth.coinbase }, function (errDAdd, resDADD) {
                        if (resDADD) {
                            console.log("Patient information added successfully", resDADD);
                            cb(null, resDADD);
                        }
                        else {
                            console.log("Failed to Add patient info", resDADD);
                            cb(errDAdd);
                        }
                    })
                }
            })
        }
        else {
            cb(errContract);
        }
        
    })
    
}

/**
 * This function will get patient information
 * @param {number} patientId 
 * @param {callback} cb 
 */
function getPatient(patientId, cb) {
    contractInstance.smartContractInstance(function(errContract, instance){
        if(!errContract){
            instance.isPatientAdded(patientId, function (errD, resD) {
                if (!resD) {
                    cb("Invalid patient ID. No patients are added for this ID.");
                }
                else {
                    
                    instance.getPatient(patientId, function (errDget, resDget) {
                        console.log(errDget, resDget);
                        if (resDget) {
                            console.log("Patient information get successfully", resDget);
                            cb(null, resDget);
                        }
                        else {
                            console.log("Failed to get patient info", errDget);
                            cb(errDget);
                        }
                    })
                }
            })
        }
        else {
            cb(errContract);
        }
    });
   
}


module.exports = {
    addPatient,
    getPatient
}
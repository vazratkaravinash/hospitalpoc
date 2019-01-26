const contractInstance = require('../lib/contractInstance');
const Web3 = require('web3');
const config = require('../config/contract.json')
var web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));
var async = require('async')


/**
 * This function will add doctor information on blockchain
 * @param {object} doctorInfo 
 * @param {callback} cb 
 */
function addDoctor(doctorInfo, cb) {
    contractInstance.smartContractInstance(function (errContract, instance) {
        if (!errContract) {
            instance.isDoctorAdded(doctorInfo.doctorId, { gas: 4000000, from: web3.eth.coinbase }, function (errD, resD) {
                if (resD) {
                    cb("Please use another doctor ID");
                }
                else {
                    console.log("here", doctorInfo.doctorId, doctorInfo.doctorName, doctorInfo.doctorEmail, doctorInfo.doctorContact, doctorInfo.doctorAddress);
                    instance.addDoctor(doctorInfo.doctorId, doctorInfo.doctorName, doctorInfo.doctorEmail, doctorInfo.doctorContact, doctorInfo.doctorAddress, { gas: 4000000, from: web3.eth.coinbase }, function (errDAdd, resDADD) {
                        if (resDADD) {
                            console.log("Doctor information added successfully", resDADD);
                            cb(null, resDADD);
                        }
                        else {
                            console.log("Failed to Add doctor info", resDADD);
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
 * This function will get doctor information
 * @param {number} doctorId 
 * @param {callback} cb 
 */
function getDoctor(doctorId, cb) {
    contractInstance.smartContractInstance(function (errContract, instance) {
        if (!errContract) {
            instance.isDoctorAdded(doctorId, function (errD, resD) {
                if (!resD) {
                    cb("Invalid doctor ID. No doctors are added for this ID.");
                }
                else {
                    instance.getDoctor(doctorId, function (errDget, resDget) {
                        if (resDget) {
                            console.log("Doctor information added successfully", resDget);
                            cb(null, resDget);
                        }
                        else {
                            console.log("Failed to Add doctor info", errDget);
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

/**
 * This function will give all patient details consulted by doctor
 * @param {number} doctorId 
 * @param {callback} cb 
 */
function getAllPatients(doctorId, cb) {
    contractInstance.smartContractInstance(function (errContract, instance) {
        if (errContract) {
            cb(errContract);
        }
        else {
            instance.getAllPatients(doctorId, function (errC, resC) {
                if (errC) {
                    cb(errC);
                }
                else {
                    if (resC == 0) {
                        cb("No patient record in the system");
                    }
                    else {
                        console.log(resC);
                        async.map(resC, function (id, callback) {
                            instance.getPatient(id, function (errP, resP) {
                                callback(errP, resP);
                            })
                        }, function (errCallback, allPatientData) {
                            if (errCallback) {
                                cb("Error in getting all patients details");
                            }
                            else {
                                cb(null, allPatientData);
                            }
                        })
                    }
                }
            })
        }
    });
}

    module.exports = {
        addDoctor,
        getDoctor,
        getAllPatients
    }
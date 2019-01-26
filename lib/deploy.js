const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const jsonfile = require('jsonfile');
const path = require('path');
const address = path.join(__dirname, '../config/contractAddress.json');
const config = require('../config/contract.json');

console.log(config.localBlockchain);
const web3 = new Web3(new Web3.providers.HttpProvider(config.localBlockchain));
web3.personal.unlockAccount(web3.eth.coinbase, config.coinBasePassword, function (err, result) {
	if (err) {
		console.log('Error while unlocking the coinbase account');
	} else {
		console.log('Coinbase unlocked successfully');
		const input = fs.readFileSync('../contracts/Hospital.sol');
		const output = solc.compile(input.toString(), 1);
		const bytecode = output.contracts[':Hospital'].bytecode;
		const abi = JSON.parse(output.contracts[':Hospital'].interface);
		const gasEstimate = web3.eth.estimateGas({ data: '0x' + bytecode });
		const contract = web3.eth.contract(abi);
		/**
		 * Function that deploys Hospital.sol contract on blockcahin
		 * @param {bytecode} bytecode of Hospital.sol contract
		 * @param {web3.eth.coinbase} Account which deployed the contract
		 * @param {gasEstimate} gas required
		 */
		contract.new({ data: '0x' + bytecode, from: web3.eth.coinbase, gas: gasEstimate }, (err, res) => {
			if (err) {
				console.log(err);
				return;
			} else {
				if (res.address) {
					console.log('Hospital contract Address: ' + res.address);
					const contractAddress = jsonfile.readFileSync(address);
					contractAddress['hospitalContractAddress'] = {
						'address': res.address,
						'abi': abi
					};
					fs.writeFileSync(address, JSON.stringify(contractAddress, null, 4), { spaces: 2 });
				}
			}
		});
	}
});
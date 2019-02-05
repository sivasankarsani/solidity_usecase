var MedicalReceipt = artifacts.require("./MedicalReceipt.sol");

module.exports = function(deployer) {

  deployer.deploy(MedicalReceipt);
};

var SimpleStorage = artifacts.require("./Cats.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};

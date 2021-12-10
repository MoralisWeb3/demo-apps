const FlipContract = artifacts.require("FlipContract");

module.exports = async function(deployer) {
  await deployer.deploy(FlipContract);
  let instance = await FlipContract.deployed()
  instance.fundContract({value: 100000000000000})
};
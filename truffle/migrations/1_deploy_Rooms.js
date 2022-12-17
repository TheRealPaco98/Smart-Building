const Rooms = artifacts.require("Rooms");

module.exports = function (deployer) {
  deployer.deploy(Rooms);
};

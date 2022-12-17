import RoomsBuild from "../truffle/build/contracts/Rooms.json";
import Web3 from "web3";
let selectedAccount;
let roomsContract;
let isInitialized = false;

export const init = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });
    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  roomsContract = new web3.eth.Contract(
    RoomsBuild.abi,
    RoomsBuild.networks[networkId].address
  );
  isInitialized = true;
};

export async function setHash(value) {
  if (!isInitialized) {
    await init();
  }

  return roomsContract.methods
    .setRoomInfo(2, "test", "test")
    .send({ from: selectedAccount });
}

export async function readHash() {
  if (!isInitialized) {
    await init();
  }

  return roomsContract.methods.getRoomInfo().call((err, result) => {
    console.log("stored cid in smart contract:", result);
  });
}

import RoomsBuild from "../truffle/build/contracts/Rooms.json";
import Web3 from "web3";
let selectedAccount;
let roomsContract;
let isInitialized = false;
let currentBlock;
let n;
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

}

export async function showTransactions() {
  const web3 = new Web3(window.ethereum);
  let block = await web3.eth.getBlock('latest');
  let currentBlock = block.number;
  for(var i = currentBlock; i>=0; --i){

    let block = await web3.eth.getBlock(i);
    if(block != null) {
      if(block.transactions != null && block.transactions.length != 0){
        let hash = block.transactions;
      
        let tx = await web3.eth.getTransaction(hash);
        if(tx.to != null){
          
          console.log('block number : ', i, ';transaction done on ', block.timestamp, ' from ', tx.from, ' to ', tx.to)
        }
      }
    }
  }
}

export async function setRoom(address, owner, hashedFile, idRoom) {
  if (!isInitialized) {
    await init();
  }

  return roomsContract.methods
    .setRoomInfo(address, owner, hashedFile, idRoom)
    .send({ from: selectedAccount });
}

export async function getRoomInfo(address) {
  if (!isInitialized) {
    await init();
  }

  return roomsContract.methods.getRoomInfo(address).call((err, result) => {
    console.log("stored rooms in smart contract:", result);
  });
}
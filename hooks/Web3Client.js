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
}

export async function getTransaction() {
  const web3 = new Web3(window.ethereum);
  let currentBlock =  await web3.eth.getBlockNumber();
  var transactions = []
  for (var i = currentBlock; i >=currentBlock-1; i--) {
    var block = await web3.eth.getBlock(i);
    if (block != null) {
      if (block.transactions != null && block.transactions.length != 0) {
        var blockHash =  block.transactions;
        var tx = await web3.eth.getTransaction(blockHash);
        if (tx.to != null) {
          var receipt = await web3.eth.getTransactionReceipt(tx.hash)
          var log = receipt.logs[0]
          var text = web3.eth.abi.decodeLog(["string","string"], log.data)
          var roomID = text[0]
          var accountID = text[1]
          console.log("room id:",roomID, "account id:",accountID)
          var txHash = tx.hash;
          var from = tx.from;
          var date = new Date(block.timestamp*1000);
          var ts = date.toLocaleString();          
          
          const transazioni = {
            hash: txHash,
            fr: from,
            data: ts,
            id: roomID,
            account: accountID
          }
          transactions.push(transazioni)
        }
      }
    }
  }
  console.log(transactions)
  return (transactions)
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
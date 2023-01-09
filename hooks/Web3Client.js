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

export async function getTransaction(requestAccountID) {
  const web3 = new Web3(window.ethereum);
  let currentBlock =  await web3.eth.getBlockNumber();
  const transactions = []
  for (let i = currentBlock; i >=0; i--) {
    const block = await web3.eth.getBlock(i);
    if (block != null) {
      if (block.transactions != null && block.transactions.length !== 0) {
        const blockHash =  block.transactions[0];
        const tx = await web3.eth.getTransaction(blockHash);
        if (tx.to != null) {
          const receipt = await web3.eth.getTransactionReceipt(tx.hash)
          const log = receipt.logs[0]
          const text = web3.eth.abi.decodeLog(["uint256","string"], log.data)
          const roomID = text[0]
          const accountID = text[1]
          if (accountID === requestAccountID) {
            const txHash = tx.hash;
            const from = tx.from;
            const date = new Date(block.timestamp*1000);
            const ts = date.toLocaleString();

            const transaction = {
              hash: txHash,
              fr: from,
              data: ts,
              id: roomID,
              account: accountID
            }
            transactions.push(transaction)
          }
        }
      }
    }
  }
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
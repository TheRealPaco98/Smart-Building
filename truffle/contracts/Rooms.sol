// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract Rooms {
    struct Room{
        string roomOwner;
        string roomHash;
    }

    mapping (uint256 => Room) AllRooms;

    function setRoomInfo(uint256 roomID, string memory r_owner, string memory r_hash) public {
        AllRooms[roomID].roomOwner = r_owner;
        AllRooms[roomID].roomHash = r_hash;
    }

    function getRoomInfo(uint256 roomID) public view returns(string memory r_owner, string memory r_hash) {
        return (AllRooms[roomID].roomOwner, AllRooms[roomID].roomHash);
    }

}
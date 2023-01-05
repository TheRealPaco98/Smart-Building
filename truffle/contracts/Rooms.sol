// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract Rooms {
    
    struct Room{
        string roomHash;
        string roomOwner;
        string  roomID;
    }

    mapping (string => Room[]) AllRooms;

    event showID(
        string room,
        string account
    );

    function setRoomInfo(string memory accountId, string memory r_owner, string memory r_hash, string memory r_ID) public {
        Room memory room = Room({roomHash: r_hash, roomOwner: r_owner, roomID: r_ID});
        AllRooms[accountId].push(room);
        emit showID(r_ID, accountId);
    }

    function getRoomInfo(string memory accountId) public view returns(Room[] memory) {
        return AllRooms[accountId];
    }
}
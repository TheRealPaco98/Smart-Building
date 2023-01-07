// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7;

contract Rooms {

    struct Room{
        string roomHash;
        string roomOwner;
        uint256  roomID;
    }

    mapping (string => Room[]) AllRooms;

    event showID(
        uint256 room,
        string account
    );

    function setRoomInfo(string memory accountId, string memory r_owner, string memory r_hash, uint256 r_ID) public {
        if(!checkId(accountId, r_ID)) {
            Room memory room = Room({roomHash: r_hash, roomOwner: r_owner, roomID: r_ID});
            AllRooms[accountId].push(room);
            emit showID(r_ID, accountId);
        } else {
            uint l = AllRooms[accountId].length;
            for(uint i=0; i< l; i++){
                if(AllRooms[accountId][i].roomID == r_ID){
                    AllRooms[accountId][i].roomHash = r_hash;
                    AllRooms[accountId][i].roomOwner = r_owner;
                    emit showID(r_ID, accountId);
                } 
            }
        }    
    }

    function checkId(string memory accountId, uint256 r_Id) public view returns (bool){ 
        Room[] memory arrayRooms = AllRooms[accountId];
        uint l = arrayRooms.length;
        for (uint i = 0; i<l; i++)
            if(arrayRooms[i].roomID == r_Id)
                return true;
            return false;
    }

    function getRoomInfo(string memory accountId) public view returns(Room[] memory) {
        return AllRooms[accountId];
    }
    
}
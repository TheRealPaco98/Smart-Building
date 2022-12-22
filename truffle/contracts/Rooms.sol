pragma solidity >=0.8.7;

contract Rooms {
    struct Room{
        string roomHash;
        string roomOwner;
        uint256 roomID;
    }

    mapping (string => Room) AllRooms;

    function setRoomInfo(string memory accountId, string memory r_owner, string memory r_hash, uint256 roomID) public {
        AllRooms[accountId].roomOwner = r_owner;
        AllRooms[accountId].roomHash = r_hash;
        AllRooms[accountId].roomID = roomID;
    }

    function getRoomInfo(string memory accountId) public view returns(string memory r_owner, string memory r_hash, uint256 roomID) {
        return (AllRooms[accountId].roomOwner, AllRooms[accountId].roomHash, AllRooms[accountId].roomID);
    }

}
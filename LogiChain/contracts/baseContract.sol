pragma solidity ^0.8.9;
import './userData.sol';
contract baseContract {
    struct User{
        uint flag;
        string name;
        string mobile_no;
        address payable account;
        uint id;
        uint256 payment_amt;
    }

    struct Update{
        address _address;
        uint256 timestamp;
        string update;
        User user;
    }

    event userAdded(address user_address, address sender);
    event setUpdate(address sender);

    mapping (address => User) users;
    address payable [] public addressUsers;

    Update [] updates;

    constructor(string memory name, string memory mobile_no, address payable _address) {
        User storage user = users[_address];

        user.flag = 1;
        user.name = name;
        user.mobile_no = mobile_no;
        user.id = 1;
        user.payment_amt = 0;
        user.account = _address;

        addressUsers.push(_address);
        userData usd = userData(0xb958766e6C29bD233B58e37557103fAfCD021330);
        usd.addContractAddress(_address, address(this));
    }

    function userExists(address payable _address) public view returns (bool){
        if(users[_address].flag == 0){
            return false;
        }
        return true;
    }

    function addUser(address payable _address, string memory name, string memory mobile_no, uint id, uint256 payment_amt) public{
        if(!userExists(_address)){
            User storage user = users[_address];

            user.flag = 1;
            user.name = name;
            user.mobile_no = mobile_no;
            user.id = id;
            user.payment_amt = payment_amt;
            user.account = _address;

            addressUsers.push(_address);
            

            userData usd = userData(0xb958766e6C29bD233B58e37557103fAfCD021330);
            usd.createUser(_address, name, mobile_no);
            usd.addContractAddress(_address, address(this));

            emit userAdded(_address, msg.sender);
            //usd.createUser(_address, name, mobile_no);
        }
    }

    function setUpdates(string memory _update) public {
        Update memory update;
        update._address = msg.sender;
        update.timestamp = block.timestamp;
        update.update = _update;
        update.user = users[msg.sender];

        emit setUpdate(msg.sender);
        updates.push(update);
    }

    function getUpdates() public view returns(Update [] memory){
        return updates;
    }
  
    function addEther() external payable{}

    function getBalance() public view returns(uint256){
        return address(this).balance;
    } 

}


pragma solidity ^0.8.9;
contract userData{
    struct user{
        uint flag;
        string name;
        string mobile_no;
        address account_address;
        address[] contracts;
    }

    event userCreated(address user, string name);
    
    mapping(address => user) private users;
    address[] private addr;
    
    function createUser(address _address, string memory name, string memory mobile_no) public returns(uint){
        if(users[_address].flag != 1){
            user storage u = users[_address];
            
            u.flag = 1;
            u.name = name;
            u.mobile_no = mobile_no;
            u.account_address = _address;
            
            addr.push(_address);
            emit userCreated(_address, name);
            return 1;
        }
        return 0;
    }
    
    function findUser(address _address) public view returns(user memory){
        return users[_address];
    }
    
    function addContractAddress(address user_address, address contract_address) public returns(uint){
        if(users[user_address].flag == 1){
            users[user_address].contracts.push(contract_address);
            return 1;
        }
        return 0;
    }
    
    function getContractAddress(address user_address) public view returns(address[] memory){
        return users[user_address].contracts;
    }
}
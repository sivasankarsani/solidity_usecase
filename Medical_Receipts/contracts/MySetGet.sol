pragma solidity ^0.5.0;

contract MySetGet{

    struct person{
        address owner;
        string name;
        uint id;
    }
    person p;

    constructor(string memory _name, uint _id) public{
        p.owner = msg.sender;
        p.name = _name;
        p.id = _id;
   
    }

    modifier restricted() {
        if (msg.sender == p.owner)
         _;
    }
    function getDetails() public view returns(uint,string memory,address){
        return(p.id,p.name,p.owner);
    }
    function setName(string memory _name) public restricted {
        // require(p.owner==msg.sender,"Only Owner can Update his Name");
        p.name = _name;   
    }
    function setId(uint _id) public restricted{
        // require(p.owner==msg.sender,"Only Owner can Update his ids");
        p.id = _id;  
    }

}

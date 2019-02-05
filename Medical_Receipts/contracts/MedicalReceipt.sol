pragma solidity ^0.5.0;

contract MedicalReceipt{

    struct Patient{
        address owner;
    }
    
    struct Receipt {
        string prescription;
        string hospital_name;
        string doctor_name;
    }
    
    Patient patient;
    
    mapping (address => Receipt[]) public data;

    constructor() public{
        patient.owner = msg.sender;
        Receipt memory receipt = Receipt("No Data","Not Yet Visited","Not Yet Consulted");
        data[patient.owner].push(receipt);
    }

    modifier restricted() {
        if(msg.sender == patient.owner)
         _;
    }
    
    function getPatientLatestMedicalReceipt(address _own) view public returns(string memory, string memory, string memory){
        return (data[_own][data[_own].length - 1].prescription,
            data[_own][data[_own].length - 1].hospital_name,
            data[_own][data[_own].length - 1].doctor_name);
    }
    
         
    
//   }
      
    function setPatientMedicalReceipt(string memory _hospital_name, string memory _doctor_name, string memory _prescription) 
        public restricted  {
 
        Receipt memory receipt = Receipt(_prescription, _hospital_name, _doctor_name);
        data[patient.owner].push(receipt);
         
    }
       

}
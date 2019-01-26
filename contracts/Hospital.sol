pragma solidity ^0.4.25;


contract Hospital{

    struct doctorInfo{
        string name;
        string email;
        string contact;
        string docAddress;
    }

    struct patientInfo{
        string name;
        string email;
        string contact;
        string patientAddress;
        uint consultedDoctor;
    }
    address public ownerOfHospital;
    uint public patientCount =  0;
    mapping(uint => doctorInfo)  doctorDetails;
    mapping(uint => patientInfo) patientDetails;
    mapping(uint => bool) isDoctorRegister;
    mapping(uint => bool) isDoctorValid;
    mapping(uint => bool ) isPatientRegister;
    mapping(uint => uint[]) public consultedPatients;

    constructor() public {
        ownerOfHospital = msg.sender;
    }

    modifier onlyHospitalOwner(){
        require(msg.sender == ownerOfHospital, "Only Hospital Owner can add doctors and patiets");
        _;
    }
    
    function isDoctorAdded(uint _id) public view returns(bool){
        if(isDoctorRegister[_id] == true)
            return true;
        else
            return false;
    }
    
    function isPatientAdded(uint _id) public view returns(bool){
        if(isPatientRegister[_id] == true)
            return true;
        else
            return false;
    }

    function addDoctor(uint _id, string memory _name, string memory _mail, string memory _contact, string memory _docAddress) public onlyHospitalOwner {
        doctorInfo storage tempInfo = doctorDetails[_id];
        tempInfo.name = _name;
        tempInfo.email = _mail;
        tempInfo.contact = _contact;
        tempInfo.docAddress = _docAddress;    
        isDoctorValid[_id] = true;   
        isDoctorRegister[_id] = true;
    }

    function addPatient(uint _id, string memory _name, string memory _mail, string memory _contact, string memory _patientAddress, uint _consultedDoctor) public onlyHospitalOwner {
        patientInfo storage tempInfo = patientDetails[_id];
        tempInfo.name = _name;
        tempInfo.email = _mail;
        tempInfo.contact = _contact;
        tempInfo.patientAddress = _patientAddress;  
        tempInfo.consultedDoctor = _consultedDoctor;  
        isPatientRegister[_id] = true;
        consultedPatients[_consultedDoctor].push(_id);
        patientCount=patientCount+1;
    }
    
    function getDoctor(uint _id) public view returns(string memory, string memory, string memory, string memory){
        doctorInfo memory temp = doctorDetails[_id];
        return(temp.name,
            temp.email,
            temp.contact,
            temp.docAddress);
    }
    
    function getDoctorName(uint _id) private view returns(string memory){
        doctorInfo memory temp = doctorDetails[_id];
        return temp.name;
    }
    
    function getPatient(uint _id) public view returns(string memory, string memory, string memory, string memory, string memory){
        patientInfo memory temp = patientDetails[_id];
        string memory doctorName = getDoctorName(temp.consultedDoctor);
        return(temp.name,
            temp.email,
            temp.contact,
            temp.patientAddress,
            doctorName);
    }

    function getAllPatients(uint _id) public view returns(uint[] memory){
        return consultedPatients[_id];        
    }
}
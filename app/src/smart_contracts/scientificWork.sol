pragma solidity ^0.8.0;

contract thesis {
    string public title;
    string public author;
    string public path;
    string public hashcode;
    bool public isSigned = true;
    address public authorAddress;
    address public examinerAddress; 
   
   
    
    constructor (string memory _title, string memory _author, string memory _path, string memory _hashcode, address _authorAddress, address _examinerAddress){
        
        title =_title;
        author = _author;
        path = _path;
        hashcode = _hashcode;
        authorAddress = _authorAddress;
        examinerAddress = _examinerAddress;
    }
    
    modifier onlyExaminer(){
        require(msg.sender == examinerAddress);
        _;
    }
    
      modifier onlyAuthor(){
        require(msg.sender == authorAddress);
        _;
    }
    
        function signThesis() public onlyExaminer {
        isSigned = true;
        
    }
    
        function changeThesis(string memory _title, string memory _author, string memory _path, string memory _hashcode, address _authorAddress, address _examinerAddress) public onlyAuthor {
        title =_title;
        author = _author;
        path = _path;
        hashcode = _hashcode;
        authorAddress = _authorAddress;
        examinerAddress = _examinerAddress;
        
    }
    
    
    
}
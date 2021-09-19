pragma solidity 0.5.1;

contract scientificWork {
    string title;
    string author;
    string path;
    string hashcode;
    bool isSignt = false;
    address examiner; 
   
   
    
    constructor(string memory _title, string memory _author, string memory _path, string memory _hashcode, address _examiner)public{
        
        title =_title;
        author = _author;
        path = _path;
        hashcode = _hashcode;
        examiner = _examiner;
    }
      modifier onlyExaminer(){
        require(msg.sender == examiner);
        _;
    }
    
        function signScientificWork() public onlyExaminer {
        isSignt = true;
        
    }
    
    function getAllInformation() public view returns(string memory, string memory, string memory, string memory, address, bool){
        return (title, author, path, hashcode, examiner, isSignt);
    }
    
  
    function getPath()public view returns(string memory){
        return path;
    }
    
    function changeTitle(string memory _title) public{
        title = _title;
        
    }
    
    function changeAuthor(string memory _author) public{
        author = _author;
        
    }
    

    
}

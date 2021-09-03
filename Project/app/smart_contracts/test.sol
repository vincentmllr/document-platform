pragma solidity 0.5.1;

  
contract WissenschaftlicheArbeit {
    
    string titel;
    string autor;
    string suchindex;
    string hashcode;
    bool isSignt = false;
    address inhalteinerArrayList;
    
    constructor(string memory _titel, string memory _autor, string memory _suchindex, string memory _hashcode)public{
        
        titel =_titel;
        autor = _autor;
        suchindex = _suchindex;
        hashcode = _hashcode;
    }
    
    modifier onlyPruefer(){
        require(msg.sender == inhalteinerArrayList);
        _;
    }
    
    function getSuchindex()public view returns(string memory){
        return suchindex;
    }
    
    function aendereTitel(string memory _titel) public{
        titel = _titel;
        
    }
    
    function aendereAutor(string memory _autor) public{
        autor = _autor;
        
    }
    
    function arbeitSigen() public onlyPruefer{
        isSignt = true;
        
    }
   
   

    
}

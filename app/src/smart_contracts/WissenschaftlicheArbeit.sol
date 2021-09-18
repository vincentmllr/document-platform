pragma solidity 0.5.1;

contract WissenschaftlicheArbeit {
    string titel;
    string autor;
    string pfad;
    string hashcode;
    bool isSignt = false;
    address adresseDesPruefers; 
   
   
    
    constructor(string memory _titel, string memory _autor, string memory _pfad, string memory _hashcode, address _adresseDesPruefers)public{
        
        titel =_titel;
        autor = _autor;
        pfad = _pfad;
        hashcode = _hashcode;
        adresseDesPruefers = _adresseDesPruefers;
    }
      modifier onlyPruefer(){
        require(msg.sender == adresseDesPruefers);
        _;
    }
    
        function arbeitSigen() public onlyPruefer {
        isSignt = true;
        
    }
  
    function getPfad()public view returns(string memory){
        return pfad;
    }
    
    function aendereTitel(string memory _titel) public{
        titel = _titel;
        
    }
    
    function aendereAutor(string memory _autor) public{
        autor = _autor;
        
    }
    

    
}
pragma solidity 0.5.1;

  
contract WissenschaftlicheArbeit {
    
    string public titel;
    string public autor;
    string public suchindex;
    string public hashcode;
    
    constructor(string memory _titel, string memory _autor, string memory _suchindex, string memory _hashcode)public{
        
        titel =_titel;
        autor = _autor;
        suchindex = _suchindex;
        hashcode = _hashcode;
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
   

    
}

pragma solidity 0.5.1;

  
contract WissenschaftlicheArbeit {
    
    string public titel;
    string public autor;
    
    constructor(string memory _titel, string memory _autor)public{
        
        titel =_titel;
        autor = _autor;
    }
   

    
}

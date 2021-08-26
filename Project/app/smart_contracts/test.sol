pragma solidity ^0.5.1;

  
contract test {
    
    Arbeit[] public arbeit;
    
    int256 public anzahlArbeiten ;
    
    struct Arbeit{
    
    string _titel;
    string _autor;
   
    
    }
  
    
    function addArbeit(string memory _titel, string memory _autor) public {
        arbeit.push(Arbeit(_titel, _autor));
        anzahlArbeiten += 1;
       
        
    }
}

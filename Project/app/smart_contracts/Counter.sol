pragma solidity ^0.8.0;
contract Counter {
  uint public trasactionCount = 0;
  
  function AddTransaction() public {
    trasactionCount++;
  }
}
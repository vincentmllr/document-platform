pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;
    
    constructor() {
        count = 8;
    }
    function reset() public {
        count = 0;
    }
}
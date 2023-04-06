// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Example {
    uint256 number;
    string str;
    uint256[] arr;

    function setNumber(uint256 _number) public {
        number = _number;
    }
    
    function getNumber() public view returns(uint256){
        return number;
    }
    
    function setStr(string calldata _str) public {
        str = _str;
    }
    
    function getStr() public view returns(string memory){
        return str;
    }

    function addToData(uint256 _number) public {
        arr.push(_number);
    }

    function getData() public view returns(uint256[] memory){
        return arr;
    }
}
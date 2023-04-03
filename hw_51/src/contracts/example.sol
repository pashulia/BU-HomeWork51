// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract Example {
    uint256 number;
    uint256[] arr;

    function setNumber(uint256 _number) public {
        number = _number;
    }
    
    function getNumber() public view returns(uint256){
        return number;
    }

    function addToData(uint256 _number) public {
        arr.push(_number);
    }

    function getData() public view returns(uint256[] memory){
        return arr;
    }
}
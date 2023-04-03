// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.19;

contract Example {
    uint256 number;
    string str;
    uint256[] arr;

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function getStr() public view returns(string memory){
        return str;
    }

    function setStr(string memory _str) public {
        str = _str;
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
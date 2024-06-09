// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract StorageTest {
    string public name;
    string public description;
    string public image_link;
    uint256 public date;
    string [] sectorNames;
    uint16 [] sectorTokens;

    // Function to store a string
    function store(string memory _name, string memory _description, string memory _image_link,
                        uint256 _date, string [] memory _sectorNames, uint16 [] memory _sectorTokens) public {
        
        name = _name;
        description = _description;
        image_link = _image_link;
        date = _date;
        sectorNames = _sectorNames;
        sectorTokens = _sectorTokens; 
    }

}
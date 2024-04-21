// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error TokenNotAvailable();
error InsufficientFounds();
error OnlyOwner();

contract Event is ERC1155, ReentrancyGuard {

    address payable public immutable orgAddress;
    uint256 private orgCredits;

    string public ipfsLink;

    mapping(uint256 => uint256) _tokenPrice;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // passing a struct makes big costs that's why we're sending arrays
    constructor(address payable _orgAddress, string memory _ipfsLink, string [] memory _sectorsName, uint256 [] memory _sectorsNoPlace,
                bool [] memory _sectorsNumerable, uint256 [] memory _sectorsPrice) ERC1155("") {
        // first token has to have ID 1, id 0 will be reserved on ipfs for event details
        _tokenIds.increment();

        ipfsLink = _ipfsLink;
        orgAddress = _orgAddress;

        for(uint i = 0; i < (_sectorsName.length); i++) {
            if(_sectorsNumerable[i]) {
                for(uint j = 0; j<_sectorsNoPlace[i]; j++) {
                    uint256 tokenId = _tokenIds.current();
                    _mint(address(this), tokenId, 1, "");
                    _tokenPrice[tokenId] = _sectorsPrice[i];
                    _tokenIds.increment();  
                }
            } else {
                uint256 tokenId = _tokenIds.current();
                _mint(address(this), tokenId, _sectorsNoPlace[i], "");
                _tokenPrice[tokenId] = _sectorsPrice[i];
                _tokenIds.increment();
            }
        }

    }

    function buyTicket(uint256 _tokenId, uint256 _amount) external payable nonReentrant {
        if(this.balanceOf(address(this), _tokenId) < _amount)
            revert TokenNotAvailable();
        if(msg.value < (_tokenPrice[_tokenId] * _amount)) 
            revert InsufficientFounds();

        orgCredits += msg.value;

        this.safeTransferFrom(address(this), msg.sender, _tokenId, _amount, "");
    }

    function withdrawOrgCredits() public nonReentrant {
        if(msg.sender != orgAddress)
            revert OnlyOwner();

        uint256 proceeds = orgCredits; 
        orgCredits = 0;
        orgAddress.transfer(proceeds);
    }

    function uri(uint256 _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(
                ipfsLink,
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }
}
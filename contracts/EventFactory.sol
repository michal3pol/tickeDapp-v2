// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "contracts/Event.sol";
import "contracts/types/types.sol";

error AlreadyVoted();

contract EventFactory {

    mapping(address => RateScore) public organizerRateScores;
    mapping(address => mapping(address => bool)) public organizerVoters;
    mapping(EventType => EventInfo[]) public events;

    uint256 public ownerFee = 0;
    address payable public ownerAddr;
    uint256 ownerCredits;

    constructor() {
      ownerAddr = payable(msg.sender);
    }

    function createEvent(EventType _et, string memory _eventIpfsLink, string [] memory _sectorsName, uint256 [] memory _sectorsNoPlace,
                bool [] memory _sectorsNumerable, uint256 [] memory _sectorsPrice) external payable {
          
        if(msg.value < ownerFee) 
          revert InsufficientFounds();

        ownerCredits += msg.value;
        Event newEvent =  new Event(payable(msg.sender), _eventIpfsLink, _sectorsName, _sectorsNoPlace, _sectorsNumerable, _sectorsPrice);
        events[_et].push(EventInfo(address(newEvent), _eventIpfsLink));
    }

    function rateOrganizer(address _org, bool _vote) external {        
        if(organizerVoters[_org][msg.sender]) 
          revert AlreadyVoted();

        if(_vote) {
            organizerRateScores[_org].postiveVotes += 1;
        } else {
            organizerRateScores[_org].negativeVotes += 1;
        }
        organizerVoters[_org][msg.sender] = true;
    }

    function updateOrgFee(uint256 _newFee) external {
      if(msg.sender != ownerAddr)
        revert OnlyOwner();
      ownerFee = _newFee;
    }

    function withdrawOrgCredits() public {
      if(msg.sender != ownerAddr)
          revert OnlyOwner();

      uint256 proceeds = ownerCredits; 
      ownerCredits = 0;
      ownerAddr.transfer(proceeds);
    }

    function getEventsByType(EventType _eType) public view returns(EventInfo[] memory) {
        return events[_eType];
    }

    function getOrganizerScore(address _org) public view returns(RateScore memory) {
        return organizerRateScores[_org];
    }

}
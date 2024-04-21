// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

struct RateScore {
  uint256 postiveVotes;
  uint256 negativeVotes;
}

struct EventInfo {
    address eventAddress;
    string descLink;
}

enum EventType {
  Other,
  Sport,
  Culture,
  Conference,
  Festival,
  Family,
  Virtual
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TreeNFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public treeIds;
    mapping(uint => Tree) public listoftrees;

    struct Tree {
      uint256 tokenId;
      string cid;
      uint timeBeforeCutting;
      uint expectedTimberValue;
      uint estimatedCO2Aborption;
      uint trunkSize;
      address owner;
    }

    event TreeCreated (
      uint256 tokenId,
      string cid,
      uint timeBeforeCutting,
      uint expectedTimberValue,
      uint estimatedCO2Aborption,
      uint trunkSize,
      address owner
    );

    constructor() ERC721("COTree NFT", "COT") {
    }

    function mintTree(
      string memory _cid,
      uint _timeBeforeCutting,
      uint _expectedTimberValue,
      uint _estimatedCO2Aborption,
      uint _trunkSize
    ) public payable returns (uint) {
      treeIds.increment();
      uint256 newTreeId = treeIds.current();

      _mint(msg.sender, newTreeId);
      _setTokenURI(newTreeId, _cid);

      listoftrees[newTreeId] = Tree(newTreeId, _cid, _timeBeforeCutting, _expectedTimberValue, _estimatedCO2Aborption, _trunkSize, msg.sender);
      emit TreeCreated(newTreeId, _cid, _timeBeforeCutting, _expectedTimberValue, _estimatedCO2Aborption, _trunkSize, msg.sender);

      return newTreeId;
    }

  function fetchUserTreeNFTs(address _userAddress) public view returns (Tree[] memory) {
    uint totalNFTCount = treeIds.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalNFTCount; i++) {
      if (listoftrees[i + 1].owner == _userAddress) {
        itemCount += 1;
      }
    }

    Tree[] memory items = new Tree[](itemCount);

    for (uint i = 0; i < totalNFTCount; i++) {
      if (listoftrees[i + 1].owner == _userAddress) {
        uint currentId = i + 1;
        Tree storage currentTree = listoftrees[currentId];
        items[currentIndex] = currentTree;
        currentIndex += 1;
      }
    }

    return items;   
  }
}
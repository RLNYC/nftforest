// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract TreeNFTMarketplace is ERC721URIStorage, VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;

    using Counters for Counters.Counter;
    Counters.Counter public treeIds;
    mapping(uint => Tree) public listoftrees;

    uint256 public randomNumberFromVRF;

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
      uint precentGiveBack,
      address owner
    );

    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Polygon (Matic) Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
     */
    constructor()
      ERC721("COTree NFT", "COT")
      VRFConsumerBase(
        0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
        0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
      )
    {
      keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
      fee = 0.0001 * 10 ** 18; // 0.0001 LINK (Varies by network)
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

      uint precentGiveBack = getRandomValue(10);
      uint amount = (msg.value * precentGiveBack) / 100;
      payable(msg.sender).transfer(amount);

      listoftrees[newTreeId] = Tree(newTreeId, _cid, _timeBeforeCutting, _expectedTimberValue, _estimatedCO2Aborption, _trunkSize, msg.sender);
      emit TreeCreated(newTreeId, _cid, _timeBeforeCutting, _expectedTimberValue, _estimatedCO2Aborption, _trunkSize, precentGiveBack, msg.sender);

      return precentGiveBack;
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

  function getRandomNumber() public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
    return requestRandomness(keyHash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    randomNumberFromVRF = randomness;
  }

  function getRandomValue(uint mod) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, randomNumberFromVRF))) % mod;
  }

  // WARMING: Remove this on production
  // Withdraw all the funds from the contract
  function withdraw() public {
    payable(msg.sender).transfer(address(this).balance);
  }

  /**
  * WARMING: Remove this on production
  * Avoid locking your LINK in the contract
  */
  function withdrawLink() external {
      require(LINK.transfer(msg.sender, LINK.balanceOf(address(this))), "Unable to transfer");
  }
}
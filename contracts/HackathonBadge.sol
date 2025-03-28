// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HackathonBadge is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(address => bool) public hasBadge;

    constructor() ERC721("HackathonBadge", "HACK") Ownable(msg.sender) {}

    function awardBadge(address winner, string memory tokenURI) public onlyOwner {
        require(!hasBadge[winner], "Winner already has a badge.");
        
        _tokenIds++;
        _mint(winner, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        hasBadge[winner] = true;
    }
}

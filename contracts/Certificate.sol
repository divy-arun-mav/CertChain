// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Certificate is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(address => bool) public hasCertificate;

    constructor() ERC721("BlockchainCertificate", "CERT") Ownable(msg.sender) {}

    function issueCertificate(address student, string memory tokenURI) public onlyOwner {
        require(!hasCertificate[student], "Student already has a certificate.");
        
        _tokenIds++;
        _mint(student, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        hasCertificate[student] = true;
    }
}
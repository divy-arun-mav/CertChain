// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SolidityIDELocker {
    mapping(address => bool) public hasUnlockedIDE;
    address public certificateContract;

    constructor(address _certificateContract) {
        certificateContract = _certificateContract;
    }

    function unlockIDE(address student) public {
        require(CertificateNFT(certificateContract).hasCertificate(student), "Student does not have a Solidity certificate.");
        hasUnlockedIDE[student] = true;
    }
}

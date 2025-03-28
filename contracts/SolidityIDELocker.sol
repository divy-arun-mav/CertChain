// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IEduChainCertifications {
    function verifyCertificate(uint256 certificateId, bytes32 certHash) external view returns (bool);
    function getStudentCertificates(address student) external view returns (uint256[] memory);
    function certificates(uint256 certificateId) external view returns (
        uint256 id, address student, string memory courseName, uint256 score, uint256 issueDate, bool valid, bytes32 certificateHash
    );
}

contract SolidityIDELocker {
    mapping(address => bool) public hasUnlockedIDE;
    address public certificateContract;

    constructor(address _certificateContract) {
        certificateContract = _certificateContract;
    }

    function unlockIDE(address student) public {
        require(!hasUnlockedIDE[student], "IDE already unlocked for this student");
        
        IEduChainCertifications certContract = IEduChainCertifications(certificateContract);
        uint256[] memory studentCerts = certContract.getStudentCertificates(student);
        require(studentCerts.length > 0, "Student has no certificates");

        bool validCertificate = false;

        for (uint256 i = 0; i < studentCerts.length; i++) {
            (uint256 certId, , string memory courseName, uint256 score, uint256 issueDate, bool valid, bytes32 certHash) = certContract.certificates(studentCerts[i]);

            if (valid && score >= 50) {  
                bytes32 computedHash = keccak256(abi.encodePacked(student, courseName, score, issueDate));
                if (computedHash == certHash) {
                    validCertificate = true;
                    break;
                }
            }
        }

        require(validCertificate, "Student does not have a valid Solidity certificate.");
        hasUnlockedIDE[student] = true;
    }
}

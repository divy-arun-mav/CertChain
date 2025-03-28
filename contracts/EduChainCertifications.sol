// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EduChainCertifications {
    
    enum Role { None, Student, Educator }
    
    address public owner;
    
    mapping(address => Role) public roles;

    struct Student {
        string name;
        uint256 age;
        string studentId;
        bool registered;
    }

    struct Certificate {
        uint256 id;
        address student;
        string courseName;
        uint256 score;
        uint256 issueDate;
        bool valid;
        bytes32 certificateHash;
    }

    uint256 public certificateCounter;
    
    mapping(address => Student) public students;
    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) public studentCertificates;

    event RoleAssigned(address indexed account, Role role);
    event StudentRegistered(address indexed student, string name, uint256 age, string studentId);
    event CertificateIssued(uint256 indexed certificateId, address indexed student, string courseName, uint256 score, bytes32 certHash);
    event CertificateRevoked(uint256 indexed certificateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyEducator() {
        require(roles[msg.sender] == Role.Educator, "Only educators can perform this action");
        _;
    }
    
    modifier onlyStudent() {
        require(roles[msg.sender] == Role.Student, "Only students can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Educator;
        emit RoleAssigned(msg.sender, Role.Educator);
    }
    
    function assignRole(address account, Role role) external onlyOwner {
        roles[account] = role;
        emit RoleAssigned(account, role);
    }

    function registerStudent(address student, string calldata name, uint256 age, string calldata studentId) external onlyEducator {
        require(roles[student] == Role.Student, "Account must have a student role");
        require(!students[student].registered, "Student already registered");

        students[student] = Student({
            name: name,
            age: age,
            studentId: studentId,
            registered: true
        });

        emit StudentRegistered(student, name, age, studentId);
    }

    function getStudentDetails(address student) external view returns (string memory, uint256, string memory) {
        require(students[student].registered, "Student not registered");
        Student memory s = students[student];
        return (s.name, s.age, s.studentId);
    }

    function issueCertificate(
        address student,
        string calldata courseName,
        uint256 score
    ) external onlyEducator {
        require(score >= 50, "Score below passing threshold");
        require(students[student].registered, "Student not registered");

        certificateCounter++;
        
        bytes32 certHash = keccak256(abi.encodePacked(student, courseName, score, block.timestamp));

        certificates[certificateCounter] = Certificate({
            id: certificateCounter,
            student: student,
            courseName: courseName,
            score: score,
            issueDate: block.timestamp,
            valid: true,
            certificateHash: certHash
        });

        studentCertificates[student].push(certificateCounter);
        emit CertificateIssued(certificateCounter, student, courseName, score, certHash);
    }

    function reexamineCertificate(
        uint256 certificateId,
        uint256 newScore
    ) external onlyEducator {
        Certificate storage cert = certificates[certificateId];
        require(cert.valid, "Certificate not valid");
        require(newScore >= 50, "New score below passing threshold");

        cert.score = newScore;
        cert.issueDate = block.timestamp;
        cert.certificateHash = keccak256(abi.encodePacked(cert.student, cert.courseName, newScore, block.timestamp));

        emit CertificateIssued(certificateId, cert.student, cert.courseName, newScore, cert.certificateHash);
    }

    function verifyCertificate(uint256 certificateId, bytes32 certHash) external view returns (bool) {
        Certificate memory cert = certificates[certificateId];
        if (!cert.valid) return false;
        return (cert.certificateHash == certHash);
    }

    function revokeCertificate(uint256 certificateId) external onlyEducator {
        Certificate storage cert = certificates[certificateId];
        require(cert.valid, "Certificate already revoked");
        cert.valid = false;
        emit CertificateRevoked(certificateId);
    }

    function getAllCertificates() external view returns (Certificate[] memory) {
        Certificate[] memory allCerts = new Certificate[](certificateCounter);
        for (uint256 i = 1; i <= certificateCounter; i++) {
            allCerts[i - 1] = certificates[i];
        }
        return allCerts;
    }
    
    function getStudentCertificates(address student) external view returns (Certificate[] memory) {
        uint256[] storage certIds = studentCertificates[student];
        Certificate[] memory studentCerts = new Certificate[](certIds.length);
        for (uint256 i = 0; i < certIds.length; i++) {
            studentCerts[i] = certificates[certIds[i]];
        }
        return studentCerts;
    }
}
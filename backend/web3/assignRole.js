const Web3 = require("web3");
const abi = require("./abi.json");
const web3 = new Web3("https://rpc.open-campus-codex.gelato.digital/");
const contractAddress = process.env.CONTRACT_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const contract = new web3.eth.Contract(abi, contractAddress);

async function assignRole(address) {
    if (!address) {
        console.error("Wallet address not provided");
        return;
    }

    try {
        const gasEstimate = await contract.methods.assignRole(address, 2).estimateGas({ from: account.address });

        const tx = await contract.methods.assignRole(address, 2).send({
            from: account.address,
            gas: gasEstimate,
        });

        console.log("Role assigned:", tx.transactionHash);
        return tx;
    } catch (error) {
        console.error("Error assigning role to student:", error);
    }
}

module.exports = {assignRole}
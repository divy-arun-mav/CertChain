/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

const { ethereum } = window as any;

export async function deployToChain(
    abi: any,
    bytecode: string,
    args: any[] = []
): Promise<string> {
    if (typeof window === "undefined" || !ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy(...args);
    await contract.deployed();

    console.log("Contract deployed at:", contract.address);
    return contract.address;
}

export async function handleDeploy(
    abi: any,
    bytecode: string,
    args: any[] = []
): Promise<string> {
    const address = await deployToChain(abi, bytecode, args);
    return address;
}

export async function getContractInstance(
    contractAddress: string,
    abi: any
): Promise<ethers.Contract> {
    if (typeof window === "undefined" || !ethereum) {
        throw new Error("MetaMask is not installed.");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("Contract instance:", contract);
    return contract;
}
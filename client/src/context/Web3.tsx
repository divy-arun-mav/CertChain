/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, ethers } from "ethers";
import educhainabi from "../contracts/EduChainCertifications.sol/abi.json";
import studygroupabi from "../contracts/StudyGroup.sol/abi.json";
import studytrackerabi from "../contracts/StudyTracker.sol/abi.json";
// import hackathonbadgeabi from "../contracts/HackathonBadge.sol/abi.json";
import { createContext, useEffect, useState, ReactNode, useContext, useCallback } from "react";

interface Web3State {
    provider: ethers.providers.Web3Provider | null;
    signer: ethers.Signer | null;
    educhaincontract: ethers.Contract | null;
    studygroupcontract: ethers.Contract | null;
    studytrackercontract: ethers.Contract | null;
    // hackathonbadgecontract: ethers.Contract | null;
}

interface Web3ContextType {
    address: string | null;
    state: Web3State;
    certi: number;
    connectWallet: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<Web3State>({
        provider: null,
        signer: null,
        educhaincontract: null,
        studygroupcontract:  null,
        studytrackercontract:  null,
        // hackathonbadgecontract:  null
    });

    const [certi, setCerti] = useState<number>(0);
    const [address, setAddress] = useState<string | null>(null);

    const getStudentCertificatesCount = async (
        educhaincontract: ethers.Contract | null,
        address: string | null
    ): Promise<void> => {
        if (!educhaincontract || !address) {
            console.warn("Contract or address missing");
            return;
        }

        try {
            const certs = await educhaincontract.getStudentCertificates(address);
            const validCerts = certs.filter((cert: any) => cert.valid);
            setCerti(validCerts.length);
        } catch (error) {
            console.error("Failed to fetch certificates:", error);
            return;
        }
    };

    const toChecksum = (address: string) => ethers.utils.getAddress(address);

    useEffect(() => {
        getStudentCertificatesCount(state.educhaincontract, address);
    }, [state.educhaincontract,address]);




    const connectWallet = useCallback(async () => {
        const educhaincontractAddress = import.meta.env.VITE_EDUCHAINCERTIFICATIONS_CONTRACT_ADDRESS;
        const studygroupcontractAddress = import.meta.env.VITE_STUDYGROUP_CONTRACT_ADDRESS;
        const studytrackercontractAddress = import.meta.env.VITE_STUDYTRACKER_CONTRACT_ADDRESS;
        // const hackathonbadgecontractAddress = import.meta.env.VVITE_HACKATHONBADGE_CONTRACT_ADDRESS;

        
        try {
            const { ethereum } = window as any;
            if (!ethereum) {
                alert("Please install and log in to Metamask to initiate the transaction.");
                return;
            }

            const accounts: string[] = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAddress(toChecksum(accounts[0]));

            ethereum.on("chainChanged", () => window.location.reload());
            ethereum.on("accountsChanged", () => window.location.reload());

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const educhaincontract = new Contract(educhaincontractAddress, educhainabi, signer);
            const studygroupcontract = new Contract(studygroupcontractAddress, studygroupabi, signer);
            const studytrackercontract = new Contract(studytrackercontractAddress, studytrackerabi, signer);
            // const hackathonbadgecontract = new Contract(hackathonbadgecontractAddress, hackathonbadgeabi, signer);

            console.log(educhaincontract);

            setState({
                provider,
                signer,
                educhaincontract: educhaincontract,
                studygroupcontract: studygroupcontract,
                studytrackercontract: studytrackercontract,
                // hackathonbadgecontract: hackathonbadgecontract
            });
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("An error occurred while connecting to the wallet. Please try again.");
        }
    },[]);

    useEffect(() => {
        connectWallet();
    }, [connectWallet]);

    return (
        <Web3Context.Provider value={{ address, state, connectWallet, certi }}>
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = (): Web3ContextType => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error("useWeb3 must be used within a Web3Provider");
    }
    return context;
};

export default Web3Context;

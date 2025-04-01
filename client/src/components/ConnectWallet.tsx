import { useWallet } from "../context/Web3WalletProvider";
import { Button } from "@/components/ui/button";

export default function ConnectWallet() {
    const { walletAddress, connect, disconnect, isConnected } = useWallet();

    return (
        <div>
            {isConnected ? (
                <div>
                    <p>Connected: {walletAddress}</p>
                    <Button onClick={disconnect}>Disconnect Wallet</Button>
                </div>
            ) : (
                <Button onClick={connect}>Connect Wallet</Button>
            )}
        </div>
    );
}
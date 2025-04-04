/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import SolidityEditor from '@/components/SolidityEditor';
import { handleDeploy, getContractInstance } from '@/utils/ContractUtils';
import toast from 'react-hot-toast';

interface FunctionCallProps {
    func: any;
    contractAddress: string;
    abi: any;
}

const FunctionCall: React.FC<FunctionCallProps> = ({ func, contractAddress, abi }) => {
    const [inputs, setInputs] = useState<string[]>(func.inputs ? func.inputs.map(() => "") : []);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleCall = async () => {
        setError(null);
        setResult(null);
        try {
            const contract = await getContractInstance(contractAddress, abi);
            // Call the function using the input values.
            const res = await contract[func.name](...inputs);
            setResult(res);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="border p-2 my-2 rounded">
            <p className="font-bold">{func.name} ({func.stateMutability})</p>
            {func.inputs && func.inputs.length > 0 && (
                <div className="flex flex-col gap-2 mb-2">
                    {func.inputs.map((input: any, i: number) => (
                        <div key={i}>
                            <label className="text-sm">
                                {input.name} ({input.type}):
                            </label>
                            <input
                                type="text"
                                className="border p-1 text-black w-full"
                                value={inputs[i]}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <Button onClick={handleCall}>Call {func.name}</Button>
            {result && (
                <p className="mt-2 text-green-400">
                    Result: {typeof result === 'object' ? JSON.stringify(result) : result.toString()}
                </p>
            )}
            {error && <p className="mt-2 text-red-500">Error: {error}</p>}
        </div>
    );
};

const SolidityGen = () => {
    const [contractDetail, setContractDetail] = useState('');
    const [generatedCode, setGeneratedCode] = useState(
        `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting = "Hello, Blockchain!";
}`
    );
    const [loading, setLoading] = useState(false);
    const [deploying, setDeploying] = useState(false);
    const [compiling, setCompiling] = useState(false);
    const [deploymentResult, setDeploymentResult] = useState<any>(null);
    const [compileResult, setCompileResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Generate Solidity code via Gemini.
    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:5000/api/generate-solidity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ field: contractDetail }),
            });
            const data = await res.json();
            if (res.ok) {
                setGeneratedCode(data.code);
            } else {
                setError(data.error || 'Failed to generate code');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Compile the generated contract.
    const handleCompile = async () => {
        setCompiling(true);
        setError(null);
        try {
            const contractNameMatch = generatedCode.match(/contract\s+(\w+)/);
            if (!contractNameMatch) {
                setError('Contract name not found in source code');
                setCompiling(false);
                return;
            }
            const contractName = contractNameMatch[1];

            const res = await fetch('http://localhost:5000/api/compile-contract', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceCode: generatedCode, contractName }),
            });
            const data = await res.json();
            if (res.ok) {
                setCompileResult(data);
                toast.success("Compilation successful");
            } else {
                setError(data.error || 'Failed to compile contract');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setCompiling(false);
        }
    };

    // Deploy the compiled contract.
    const Deploy = async () => {
        setDeploying(true);
        setError(null);
        try {
            if (compileResult) {
                const constructorArgs: any[] = []; // Adjust if your contract has constructor arguments.
                const address = await handleDeploy(compileResult.abi, compileResult.bytecode, constructorArgs);
                setDeploymentResult({ address });
                toast.success(`Contract deployed at: ${address}`);
            } else {
                toast.error("Please compile the contract first");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setDeploying(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-screen min-h-screen p-3 bg-black text-white">
            {/* Left Side: Input and Interaction */}
            <div className="md:w-1/2 md:pr-4">
                <h1 className="text-2xl font-bold mb-4">Solidity Contract Generator</h1>

                <div className="mb-4">
                    <label htmlFor="contract-detail" className="block mb-2">
                        Enter details about the contract you want to create:
                    </label>
                    <Textarea
                        id="contract-detail"
                        value={contractDetail}
                        onChange={(e) => setContractDetail(e.target.value)}
                        placeholder="e.g., a token contract with minting functionality"
                        rows={5}
                    />
                </div>

                <div className="mb-4">
                    <Button onClick={handleGenerate} disabled={loading || !contractDetail}>
                        {loading ? 'Generating...' : 'Generate Solidity Code'}
                    </Button>
                </div>

                <div className="mb-4 flex gap-4">
                    <Button onClick={handleCompile} disabled={compiling || !generatedCode}>
                        {compiling ? 'Compiling...' : 'Compile Contract'}
                    </Button>
                    <Button onClick={Deploy} disabled={deploying || !compileResult}>
                        {deploying ? 'Deploying...' : 'Deploy on EDU Chain Testnet'}
                    </Button>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {deploymentResult && compileResult && (
                    <div className="mt-4 p-4 bg-gray-800 rounded">
                        <h2 className="text-xl font-bold mb-2">Deployment Details</h2>
                        <p>
                            <strong>Contract Address:</strong> {deploymentResult.address}
                        </p>
                        <div className="mt-4">
                            <h3 className="font-bold">Contract Functions</h3>
                            {compileResult.abi
                                .filter((item: any) => item.type === "function")
                                .map((func: any, index: number) => (
                                    <FunctionCall
                                        key={index}
                                        func={func}
                                        contractAddress={deploymentResult.address}
                                        abi={compileResult.abi}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side: Code Editor */}
            <div className="md:w-1/2 md:pl-4 mt-4 md:mt-0">
                {generatedCode && (
                    <div>
                        <SolidityEditor code={generatedCode} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SolidityGen;
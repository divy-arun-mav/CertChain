import { useState } from "react";
import Editor from "@monaco-editor/react";

const SolidityEditor = () => {
    const [code, setCode] = useState<string>(
        `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string public greeting = "Hello, Blockchain!";
}`
    );

    return (
        <div className="w-full h-[90vh] bg-black">
            <Editor
                height="100%"
                defaultLanguage="solidity"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    fontFamily: "Fira Code, monospace",
                }}
            />
        </div>
    );
};

export default SolidityEditor;
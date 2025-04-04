import { useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";

interface SolidityEditorProps {
    code: string;
}

const SolidityEditor: React.FC<SolidityEditorProps> = ({ code }) => {
    useEffect(() => {
        loader.init().then((monaco) => {
            monaco.editor.defineTheme("custom-solidity-theme", {
                base: "vs-dark",
                inherit: true,
                rules: [
                    { token: "comment", foreground: "7FDBFF", fontStyle: "italic" },
                    { token: "keyword", foreground: "00BFFF" },
                    { token: "string", foreground: "FFD700" },
                    { token: "identifier", foreground: "FFFFFF" },
                    { token: "type", foreground: "FF69B4" },
                ],
                colors: {
                    "editor.background": "#1e1e1e",
                    "editor.foreground": "#FFFFFF",
                },
            });
        });
    }, []);

    return (
        <div className="w-11/12 h-[90vh] border border-blue-500 rounded-lg p-3">
            <Editor
                height="100%"
                defaultLanguage="solidity"
                theme="custom-solidity-theme"
                value={code}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    fontFamily: "Fira Code, monospace",
                    lineNumbers: "on",
                }}
            />
        </div>
    );
};

export default SolidityEditor;
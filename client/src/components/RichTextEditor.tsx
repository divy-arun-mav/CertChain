import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

type RichTextEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editorRef = useRef < HTMLDivElement > (null);
  const quillRef = useRef < Quill | null > (null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      
        [{ 'indent': '-1' }, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         

        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         
      ];
      quillRef.current = new Quill(editorRef.current, {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: "Start typing..........",
        theme: 'snow',
      });

      quillRef.current.on("text-change", () => {
        const html = editorRef.current?.querySelector(".ql-editor")?.innerHTML;
        if (html !== undefined && onChange) {
          onChange(html);
        }
      });
    }
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [onChange, value]);

  return <div ref={editorRef} />;
};

export default RichTextEditor;
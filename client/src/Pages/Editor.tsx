import RichTextEditor from "../components/RichTextEditor";

type EditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const Editor = (props: EditorProps) => {
  return (
    <div className="w-full h-max p-5 bg-white rounded-md text-black">
      <RichTextEditor {...props} />
    </div>
  );
};

export default Editor;

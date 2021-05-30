import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextEditor = (props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: [
          "bold",
          "italic",
          "blockQuote",
          "link",
          "numberedList",
          "bulletedList",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
        ],
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange(data);
      }}
    />
  );
};

export default TextEditor;

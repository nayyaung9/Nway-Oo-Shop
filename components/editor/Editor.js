import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const TextEditor = (props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange(data);
      }}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default TextEditor;

"use client";

import React, { FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function FormPost() {
  const [heading, setHeading] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);

  const handleEditorChange = (value: string) => {
    console.log(value);

    setEditorValue(value);
    // You can perform other actions with the editor value if needed
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(heading + "\n" + editorValue);
  };

  return (
    <form
      className="max-w-md mx-auto flex flex-col items-center pt-20 h-screen p-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <input
          type="text"
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter the title"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          name="title"
        />
      </div>
      <div className="mb-4">
        <ReactQuill theme="snow" onChange={handleEditorChange} />
      </div>
      <div>
        <button className="px-7 py-2 text-white text-xl rounded-xl font-normal hover:bg-blue-500 bg-blue-400">
          POST
        </button>
      </div>
    </form>
  );
}

export default FormPost;

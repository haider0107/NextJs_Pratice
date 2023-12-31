"use client";

import axios from "axios";
import React, { FormEvent, useState,useMemo  } from "react";
import { useRouter } from "next/navigation";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

function FormPost() {
  const [heading, setHeading] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const router = useRouter();
  const { data } = useSession();

  // console.log("Post form");

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    // You can perform other actions with the editor value if needed
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(heading + "\n" + editorValue);

    try {
      const response = await axios.post("/api/posts", {
        title: heading,
        content: editorValue,
      });

      if (response.status === 200) {
        // router.push(`/blogs/${response.data.newPost.id}`);

        router.push("/blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="max-w-md md:mx-auto flex flex-col items-center pt-20 h-screen p-4 mx-[2%]"
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
        <button
          disabled={!data?.user?.id}
          className="px-7 py-2 text-white text-xl rounded-xl font-normal hover:bg-blue-500 bg-blue-400 disabled:bg-gray-400"
        >
          POST
        </button>
      </div>
    </form>
  );
}

export default FormPost;

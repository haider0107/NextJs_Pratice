"use client";

import axios from "axios";
import React, { FC, FormEvent, useEffect, useState,useMemo } from "react";
import { useRouter } from "next/navigation";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

interface FormCommentProps {
  params: {
    id: string;
  };
}

const FormUpdate: FC<FormCommentProps> = ({ params }) => {
  const [heading, setHeading] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string | undefined>(undefined);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}/edit`);
        console.log(res.data.success);
      } catch (error) {
        console.log(error);
        router.push("/blogs");
      }
    })();

    const fetchData = async () => {
      try {
        let res = await axios.get(`/api/posts/${params.id}`);
        console.log(res.data.postData.title);

        setHeading(res.data.postData.title);
        setEditorValue(res.data.postData.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params, router]);

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
    // You can perform other actions with the editor value if needed
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(heading + "\n" + editorValue);

    try {
      const response = await axios.patch(`/api/posts/${params.id}`, {
        title: heading,
        content: editorValue,
      });

      if (response.status === 200) {
        // router.push(`/blogs/${response.data.newPost.id}`);
        console.log(response.data.updatePost);
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
        {/* {console.log(editorValue)} */}
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={handleEditorChange}
        />
      </div>
      <div>
        <button
          disabled={!data?.user?.id}
          className="px-7 py-2 text-white text-xl rounded-xl font-normal hover:bg-blue-500 bg-blue-400 disabled:bg-gray-400"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default FormUpdate;

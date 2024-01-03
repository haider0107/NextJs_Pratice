"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, {  FC, useState } from "react";

interface FormCommentProps {
  postId: string;
  fetchAgain : boolean
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}

const FormComment:FC<FormCommentProps> = ({ postId,fetchAgain,setFetchAgain }) => {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleSubmitComment = async () => {
    if (comment.trim() !== "") {
      try {
        const res = await axios.post("/api/comments", {
          postId,
          text: comment,
        });
        if (res.status === 200) {
          console.log("hello");
          
          setFetchAgain(!fetchAgain)
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="mt-4">
        <label
          htmlFor="comment"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Add Comment
        </label>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          name="comment"
        />
        <button
          onClick={handleSubmitComment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default FormComment;

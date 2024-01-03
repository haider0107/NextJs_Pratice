"use client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { format } from 'date-fns';

interface CommentsProps {
  postId: string;
  fetchAgain: boolean
}

interface PostData {
  text: string;
  createdAt: Date;
  id: string;
  userId: string;
  postId: string;
  user: {
    username: string;
    email: string;
  };
}

const Comments: FC<CommentsProps> = ({ postId, fetchAgain }) => {
  const [comments, setComments] = useState<PostData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/comments/${postId}`);
        // console.log(res.data);
        setComments(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [postId, fetchAgain]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-2">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 bg-slate-300 p-2 list-none">
            <div className="flex items-center mb-2">
              <div className="text-blue-500 font-bold mr-2">
                {comment.user.username}
              </div>
              <div className="text-gray-500">{format(comment.createdAt, 'MMMM d, yyyy')}</div>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

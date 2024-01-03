"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PostData {
  content: string;
  createdAt: Date;
  id: string;
  title: string;
  userId: string;
  user: {
    username: string;
    email: string;
  };
}

const Blogs = () => {
  const [allPost, setAllPost] = useState<PostData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/posts");

      console.log(res.data.allPost);
      setAllPost(res.data.allPost);
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-4">
      <h1 className="text-3xl font-bold mb-4">BlogPage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allPost.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>Written by: {post?.user?.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

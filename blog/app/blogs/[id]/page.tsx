"use client";

import Comments from "@/components/Comments";
import FormComment from "@/components/FormComment";
import axios from "axios";
import parse from "html-react-parser";
import { FC, useEffect, useState } from "react";

interface BlogIdProps {
  params: {
    id: string;
  };
}

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

const BlogPage: FC<BlogIdProps> = ({ params }) => {
  const [postData, setPostData] = useState<PostData>();
  const [fetchAgain,setFetchAgain] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}`);

        setPostData(res.data.postData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-4">
      <h1 className="text-3xl font-bold">{postData?.title}</h1>
      <p>Written by: {postData?.user?.username}</p>
      <div className="mt-4">
        {parse(postData?.content ? postData?.content : "")}
      </div>
      <Comments postId={params.id} fetchAgain={fetchAgain}/>
      <FormComment postId={params.id} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default BlogPage;

"use client";

import Comments from "@/components/Comments";
import FormComment from "@/components/FormComment";
import { DeleteModal } from "@/components/DeleteModal";
import axios from "axios";
import parse from "html-react-parser";
import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

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
  const [fetchAgain, setFetchAgain] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const router = useRouter();

  const currentPage = window.location.href

  const { data } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/posts/${params.id}`);

        if (data?.user.id === res?.data.postData.userId) {
          setIsAuthor(true);
        }

        setPostData(res.data.postData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params, data]);

  return (
    <div className="max-w-4xl md:mx-auto pt-20 pb-4 mx-[2%]">
      <DeleteModal open={open} setOpen={setOpen} postId={params.id} />
      <h1 className="text-3xl font-bold">{postData?.title}</h1>
      <p className="ml-4 mt-2 text-base ">Author : <span className="font-semibold text-xl">{postData?.user?.username}</span></p>
      <div className="flex gap-3 px-4 py-4 items-center ">
        <p>Share it on </p>
        <FacebookShareButton url={currentPage} >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={currentPage}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={currentPage}>
          <LinkedinIcon size={32} round={true}/>
        </LinkedinShareButton>
        <WhatsappShareButton url={currentPage}>
          <WhatsappIcon size={32} round={true}/>
        </WhatsappShareButton>
      </div>
      {isAuthor ? (
        <div className="flex gap-4">
          <button onClick={() => {
            router.push(`/blogs/${params.id}/edit`)
          }} className="px-3 bg-blue-400 text-white font-semibold rounded-md">
            Edit
          </button>
          <button
            onClick={() => setOpen(true)}
            className="px-3 bg-red-500 text-white font-semibold rounded-md"
          >
            Delete
          </button>
        </div>
      ) : (
        ""
      )}

      <div className="mt-4 mx-2 p-2 border-2 border-black">
        {parse(postData?.content ? postData?.content : "")}
      </div>
      <Comments postId={params.id} fetchAgain={fetchAgain} />
      <FormComment
        postId={params.id}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
      />
    </div>
  );
};

export default BlogPage;

"use client";
import React, { FC } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface deleteModalProps {
  open: boolean;
  postId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModal: FC<deleteModalProps> = ({
  open,
  setOpen,
  postId,
}) => {
  const handleClose = () => setOpen(false);
  const { data } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    if (data?.user?.id) {
      try {
        let res = await axios.delete(`/api/posts/${postId}`);

        if (res.status === 200) {
          handleClose();
          router.push("/blogs");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Are you sure you want to delete ?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 rounded-md mt-5 text-white font-semibold"
              >
                Delete
              </button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(passwordRules, { message: "Please create a stronger password" }),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function SignUp() {
  const [showPassword, setShowPassword] = useState("false");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const postData = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post("/api/user", data);

      console.log(res);

      if (res.status === 201) {
        router.push("/sign-in");
      } else {
        console.error("Registration Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-7 gap-3"
      >
        <div className="border-2 px-2">
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="standard"
                error={!!errors.username}
                className="w-80"
                helperText={errors.username ? errors.username?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
        </div>
        <div className="border-2 px-2">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                error={!!errors.email}
                className="w-80"
                helperText={errors.email ? errors.email?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
        </div>
        <div className="flex items-center justify-center border-2 px-2">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "password" : "text"}
                label="Password"
                variant="standard"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
          <IconButton onClick={() => setShowPassword((pass) => !pass)}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
        <div className="flex items-center justify-center border-2 px-2">
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type={showPassword ? "password" : "text"}
                label="Confirm Password"
                variant="standard"
                error={!!errors.confirmPassword}
                className="w-80"
                helperText={
                  errors.confirmPassword ? errors.confirmPassword?.message : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />
          <IconButton onClick={() => setShowPassword((pass) => !pass)}>
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </div>
        <input
          className="mt-3 bg-slate-400 hover:bg-slate-500 duration-300 p-2 text-white rounded-2xl shadow-xl cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}

export default SignUp;

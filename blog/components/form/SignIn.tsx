"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { signIn } from "next-auth/react";
import Link from "next/link";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
});

function SignIn() {
  const [showPassword, setShowPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      const signInData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="py-5 text-4xl font-semibold">
        Sign In
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-7 gap-3"
      >
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
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </div>
        <input
          className="mt-3 bg-slate-400 hover:bg-slate-500 duration-300 p-2 text-white rounded-2xl shadow-xl cursor-pointer"
          type="submit"
        />
      </form>
      <div className="text-lg">
        <p>Don&apos;t have an account ? <span className="text-blue-500 hover:text-blue-600"><Link href="/sign-up">
        SignUp
        </Link></span></p>
      </div>
    </div>
  );
}

export default SignIn;

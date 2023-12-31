"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(8).max(20).required(),
});

function SignUp() {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log("data submitted: ", data);
  };

  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-7 gap-3"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                
                
                variant="standard"
                className="border-2 border-blue-500"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
          <br />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                variant="standard"
                error={!!errors.password}
                className="border-2 border-blue-500"
                helperText={errors.password ? errors.password?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
          <input
            className="mt-3 bg-slate-400 p-2 text-white rounded-2xl shadow-xl"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;

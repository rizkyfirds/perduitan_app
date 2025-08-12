"use client";

import Image from "next/image";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

export default function Signin() {
  return (
    <div className="h-screen bg-background flex items-center justify-center">
      <Paper
        elevation={3}
        sx={{ borderRadius: "2rem" }}
        className="p-8 max-w-sm w-full"
      >
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Logo" width={300} height={300} />
        </div>

        <div className="my-3">
          <Typography variant="h5" className="text-center font-display">
            Sign In
          </Typography>
        </div>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="grid gap-y-2"
        >
          <TextField fullWidth label="Email" variant="outlined" type="email" />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
          />

          <div className="my-3">
            <Typography className="text-center font-display text-md">
              Don't have an account?{" "}
              <span className="text-[#4CAF50]">
                <a href="./signup"> Sign up</a>
              </span>
            </Typography>
          </div>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7ED957",
              "&:hover": { backgroundColor: "#6ccf49" },
              mt: 2, // margin top
              fontWeight: "bold",
              color: "black",
            }}
            fullWidth
            type="submit"
          >
            <Typography
              variant="h5"
              className="text-center"
              sx={{ fontFamily: "Futura Display, sans-serif" }}
            >
              Sign In
            </Typography>
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

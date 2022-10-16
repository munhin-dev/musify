import React from "react";
import Button from "@mui/material/Button";
import Logo from "../../assets/logo.jpg";
import { loginUrl } from "../../utils";
import "./Login.css";

export default function Login() {
  return (
    <div className="Login container">
      <img className="col-6 img-fluid mx-auto" src={Logo} alt="" />
      <h1>Welcome to Musify</h1>
      <h2>If Only Everything in Life was as Reliable as a Music</h2>
      <Button
        href={loginUrl}
        className="button"
        variant="contained"
        sx={{
          mx: 0.25,
          my: 1.5,
          borderRadius: 7,
          fontWeight: "bold",
          color: "white",
          backgroundColor: "#495057",
          borderColor: "#6C757D",
          "&:hover": {
            backgroundColor: "#6C757D",
          },
        }}
      >
        Login with Spotify
      </Button>
    </div>
  );
}

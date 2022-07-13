import React from "react";
import Button from "@mui/material/Button";
import { loginUrl } from "../Utilities";
import "./Login.css";

export default function Login() {
  return (
    <div className="login">
      <h1>Welcome to Musify</h1>
      <h2>If Only Everything in Life was as Reliable as a Music</h2>
      <Button href={loginUrl} className="button" variant="contained">
        Login with Spotify
      </Button>
    </div>
  );
}

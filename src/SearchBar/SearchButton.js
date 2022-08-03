import * as React from "react";
import Button from "@mui/material/Button";
import Cookie from "js-cookie";
import axios from "axios";

function handleClick(selectedResult, onHandleSearch) {
  let seedArtist = [];
  let seedTrack = [];
  const token = Cookie.get("token");
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  selectedResult.forEach((result) => {
    if (result.type === "artist") {
      seedArtist.push(result.id);
    } else {
      seedTrack.push(result.id);
    }
  });

  axios
    .get(
      `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${seedArtist.join(
        ","
      )}&seed_tracks=${seedTrack.join(",")}`,
      headers
    )
    .then((response) => {
      onHandleSearch(
        response.data.tracks.filter((track) => track.preview_url !== null)
      );
    })
    .catch((err) => console.log(err));
}

export default function SearchButton({ selectedResult, onHandleSearch }) {
  return (
    <Button
      variant="contained"
      onClick={() => handleClick(selectedResult, onHandleSearch)}
      sx={{
        mx: 0.25,
        my: 1,
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
      Search
    </Button>
  );
}

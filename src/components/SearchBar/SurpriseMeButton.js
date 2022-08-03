import Button from "@mui/material/Button";
import Musify from "../../utils";
const axios = require("axios");

export default function SurpriseMeButton({ onSearch }) {
  const getRecommendation = async (artistLimit, trackLimit) => {
    const headers = Musify.setHeaders();
    const getArtists = axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=${artistLimit}`,
      headers
    );
    const getTracks = axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=${trackLimit}`,
      headers
    );
    const [artists, tracks] = await Promise.all([getArtists, getTracks]);
    const results = [...artists.data.items, ...tracks.data.items];
    let [seedArtist, seedTrack] = results.reduce(
      ([artists, tracks], result) =>
        result.type === "artist"
          ? [artists + (artists.length > 0 ? "," : "") + result.id, tracks]
          : [artists, tracks + (tracks.length > 0 ? "," : "") + result.id],
      ["", ""]
    );
    const result = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${seedArtist}&seed_tracks=${seedTrack}`,
      headers
    );
    return result.data.tracks;
  };

  const handleClick = async (onSearch) => {
    const artistLimit = Math.floor(Math.random() * 5 + 1);
    const trackLimit = 5 - artistLimit;
    const recommendation = await getRecommendation(artistLimit, trackLimit);
    onSearch(recommendation.filter((track) => track.preview_url));
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleClick(onSearch)}
      sx={{
        mx: 0.25,
        my: 2,
        color: "white",
        borderRadius: 5,
        fontWeight: "bold",
        backgroundColor: "#495057",
        borderColor: "#6C757D",
        "&:hover": {
          backgroundColor: "#6C757D",
        },
      }}
    >
      Surprise Me
    </Button>
  );
}

import Button from "@mui/material/Button";
import Musify from "../../utils";
import axios from "axios";

export default function SearchButton({ selectedResult, onSearch }) {
  const handleClick = async (selectedResult, onSearch) => {
    const headers = Musify.setHeaders();
    const [seedArtist, seedTrack] = selectedResult.reduce(
      ([artists, tracks], result) =>
        result.type === "artist"
          ? [[...artists, result.id], tracks]
          : [artists, [...tracks, result.id]],
      [[], []]
    );
    const { data } = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${seedArtist.join(
        ","
      )}&seed_tracks=${seedTrack.join(",")}`,
      headers
    );
    onSearch(data.tracks.filter((track) => track.preview_url !== null));
  };

  return (
    <Button
      variant="contained"
      onClick={() => handleClick(selectedResult, onSearch)}
      sx={{
        mx: 0.25,
        my: 2,
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

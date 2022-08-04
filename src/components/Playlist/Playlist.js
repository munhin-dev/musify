import { useState } from "react";
import axios from "axios";
import Track from "./Track";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import Musify from "../../utils";
import "./Playlist.css";

function Playlist({ onAudioChange, onTracksChange, tracks }) {
  const [name, setName] = useState("");

  const handleChange = (event) => setName(event.target.value);
  const handleRemove = (id) => {
    const newTracks = tracks.filter((track) => track.id !== id);
    onTracksChange(newTracks, { clearTracks: true });
  };
  const handleClear = () => onTracksChange([], { clearTracks: true });
  const handleSave = async () => {
    const headers = Musify.setHeaders();
    const requestBody = {
      name: `${name}`,
      description: "",
      public: false,
    };
    const trackURIs = tracks
      .map((result) => result.uri)
      .join("%2C")
      .split(":")
      .join("%3A");

    try {
      if (!name) throw new Error("Playlist name cannot be empty.");
      const {
        data: { id: userId },
      } = await axios.get("https://api.spotify.com/v1/me", headers);
      const {
        data: { id: playlistId },
      } = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        requestBody,
        headers
      );
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs}`,
        {},
        headers
      );
      Swal.fire({
        icon: "success",
        title: "Playlist Saved",
        text: "Check it out on Spotify!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section className="container my-1">
      <header className="row align-items-center justify-content-between">
        <input
          onChange={handleChange}
          value={name}
          placeholder="Playlist Name..."
          className="col"
        />
        <div className="col-auto">
          <Button
            onClick={handleSave}
            size="small"
            variant="contained"
            sx={{
              borderRadius: 7,
              backgroundColor: "#495057",
              fontWeight: "bold",
              borderColor: "#6C757D",
              "&:hover": { backgroundColor: "#6C757D" },
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClear}
            size="small"
            variant="outlined"
            sx={{
              color: "white",
              fontWeight: "bold",
              mx: 0.5,
              borderRadius: 7,
              borderColor: "#495057",
              "&:hover": {
                backgroundColor: "#c10510",
                borderColor: "#c10510",
              },
            }}
          >
            Clear
          </Button>
        </div>
      </header>

      <div className="track-container">
        <table className="table table-dark table-hover align-middle text-start">
          <thead >
            <tr>
              <th className="col-1 header" scope="col">
                #
              </th>
              <th className="col-10 col-md-6 header" scope="col">
                TITLE
              </th>
              <th className="col-3 header" scope="col">
                <div className="d-none d-md-block">ALBUM</div>
              </th>
              <th className="col-1 header" scope="col">
                <div className="d-none d-md-block">
                  <AccessTimeIcon style={{ color: "white", p: 0 }} />
                </div>
              </th>
              <th className="col-1 header" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <Track
                key={track.id}
                track={track}
                onRemove={handleRemove}
                index={index}
                onAudioChange={onAudioChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Playlist;

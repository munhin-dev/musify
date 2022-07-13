import { useEffect } from "react";
import axios from "axios";
import Track from "./Track";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import "./Playlist.css";

function Playlist(props) {
  const { token, searchResult, playlistName, handlePlaylistName, handleSearch, handleTracks } = props.data;

  useEffect(() => {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("https://api.spotify.com/v1/me/top/tracks?limit=15", headers)
      .then((response) => {
        const newTracks = response.data.items;
        handleSearch(newTracks.filter((track) => track.preview_url !== null));
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const changePlaylistName = (e) => {
    handlePlaylistName(e.target.value);
  };

  const removeTrack = (idx) => {
    const newTracks = searchResult.filter((track) => searchResult.indexOf(track) !== idx);
    handleSearch(newTracks);
  };

  async function handleSave() {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const requestBody = {
      name: `${playlistName}`,
      description: "",
      public: false,
    };

    const trackURIs = searchResult
      .map((result) => result.uri)
      .join("%2C")
      .split(":")
      .join("%3A");

    let userId, playlistId;

    try {
      if (!playlistName) throw new Error("Playlist name cannot be empty.");
      await axios.get("https://api.spotify.com/v1/me", headers).then((response) => {
        userId = response.data.id;
      });

      await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, requestBody, headers).then((response) => {
        playlistId = response.data.id;
      });

      await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs}`, {}, headers).then((response) => {
        Swal.fire({
          icon: "success",
          title: "Playlist Saved",
          text: "Check it out on Spotify!",
          showConfirmButton: false,
          timer: 1500,
        });
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
  }

  const handleClear = () => {
    handleSearch([]);
  };

  return (
    <section className="playlist-container">
      <header className="playlist-header">
        <input onChange={changePlaylistName} value={playlistName} placeholder="Playlist Name..." />
        <div className="button-wrapper">
          <Button onClick={handleSave} size="small" variant="contained" sx={{ mx: 1 }}>
            Save
          </Button>
          <Button onClick={handleClear} size="small" variant="outlined">
            Clear
          </Button>
        </div>
      </header>
      <div className="list-container">
        <div className="list-header">
          <h4>#</h4>
          <h4>TITLE</h4>
          <h4>ALBUM</h4>
          <AccessTimeIcon style ={{color: 'white'}}/>
        </div>
        <div className="track-list">
          {searchResult.map((track, idx) => (
            <Track key={idx} data={{ track, idx, removeTrack, handleTracks }} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Playlist;

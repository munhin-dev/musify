import { useEffect } from 'react';
import axios from 'axios';
import Track from './Track';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import './Playlist.css'

function Playlist(props) {
  const {
    token,
    searchResult,
    playlistName,
    handlePlaylistName,
    handleSearch,
    handleTracks,
  } = props.data;

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
        handleSearch(newTracks);
      })
      .catch((error) => {
        console.log(error);
      });
  // eslint-disable-next-line
  }, [])

  const changePlaylistName = (e) => {
    handlePlaylistName(e.target.value)
  }

  const removeTrack = (idx) => {
    const newTracks = searchResult.filter(track => searchResult.indexOf(track) !== idx)
    handleSearch(newTracks)
  }

  async function handleSave() {
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let userId;

    await axios.get("https://api.spotify.com/v1/me", headers).then((response) => {
      userId = response.data.id    
    })

    const requestBody = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        "name": `${playlistName}`,
        "description": "",
        "public": false
      }
    }

    await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, requestBody)
  }

  const handleClear = () => {
    handleSearch([])
  }

  return (
    <section className="playlist-container">
      <header className="playlist-name">
        <input onChange={changePlaylistName} value={playlistName} size={100} />
      </header>
      <div className="list-container">
        <div className="list-header">
          <h4>#</h4>
          <h4>TITLE</h4>
          <h4>ALBUM</h4>
          <AccessTimeIcon />
        </div>
        <div className="track-list">
          {searchResult.map((track, idx) => (
            <Track key={idx} data={{ track, idx, removeTrack, handleTracks }} />
          ))}
        </div>
      </div>
      <footer>
        <div className="button-container">
          <Button onClick={handleSave} variant="contained">Save</Button>
          <Button onClick={handleClear} variant="outlined">Clear</Button>
        </div>
      </footer>
    </section>
  );
}

export default Playlist
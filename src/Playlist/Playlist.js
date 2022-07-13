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

    const requestBody = {
      "name": `${playlistName}`,
      "description": "",
      "public": false
    }

    const trackURIs = searchResult.map(result => result.uri).join('%2C').split(':').join('%3A')

    let userId, playlistId;

    await axios.get("https://api.spotify.com/v1/me", headers).then((response) => {
      userId = response.data.id    
    })

    await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, requestBody, headers).then((response) => {
      playlistId = response.data.id
    })
    
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs}`,{}, headers)
  }

  const handleClear = () => {
    handleSearch([])
  }
console.log(searchResult);
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
          {searchResult.filter(track => track.preview_url !== null).map((track, idx) => (
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
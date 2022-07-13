import { useEffect, useState } from 'react';
import Cookie from "js-cookie";
import axios from 'axios';
import Track from './Track';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Playlist.css'

function Playlist() {
  let [tracks, setTracks] = useState([])
  let [playlistName, setPlaylistName] = useState('Playlist Name')

  useEffect(() => {
    const token = Cookie.get("token");

    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("https://api.spotify.com/v1/me/top/tracks?limit=15", headers).then((response) => {
      // console.log(response.data);

      const newTracks = response.data.items
      setTracks(newTracks)

    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const changePlaylistName = (e) => {
    setPlaylistName(e.target.value)

    console.log(playlistName);
  }

  const removeTrack = (idx) => {
    const newTracks = tracks.filter(track => tracks.indexOf(track) !== idx)

    setTracks(newTracks)
  }

  return (
    <section className='playlist-container'>
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
          {tracks.map((track, idx) =>
            <Track data={{ track, idx, removeTrack }} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Playlist
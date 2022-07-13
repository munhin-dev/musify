import { useEffect } from 'react';
import axios from 'axios';
import Track from './Track';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Playlist.css'

function Playlist(props) {
  const {token, searchResult, playlistName, handlePlaylistName, handleSearch} = props.data

  useEffect(() => {

    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get("https://api.spotify.com/v1/me/top/tracks?limit=15", headers).then((response) => {

      const newTracks = response.data.items
      handleSearch(newTracks)

    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const changePlaylistName = (e) => {
    handlePlaylistName(e.target.value)
  }

  const removeTrack = (idx) => {
    const newTracks = searchResult.filter(track => searchResult.indexOf(track) !== idx)

    handleSearch(newTracks)
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
          {searchResult.map((track, idx) =>
            <Track data={{ track, idx, removeTrack }} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Playlist
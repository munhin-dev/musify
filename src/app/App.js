import { useState, useEffect, Fragment } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";
import Playlist from "../components/Playlist/Playlist";
import Login from "../components/Login/Login";
import Header from "../components/Header/Header";
import Musify from "../utils";
import axios from "axios";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [audio, setAudio] = useState({});

  useEffect(() => {
    if (Musify.getAccessToken()) {
      const headers = Musify.setHeaders();
      const fetchData = async () => {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?limit=15",
          headers
        );
        const tracks = data.items;
        setTracks(tracks.filter((track) => track.preview_url));
      };
      fetchData();
    }
  }, []);

  const handleTracksChange = (newTracks, { clearTracks = false } = {}) =>
    clearTracks ? setTracks(newTracks) : setTracks([...newTracks, ...tracks]);

  const handleAudioChange = (track) => setAudio(track);

  return (
    <div className="App">
      {Musify.getAccessToken() ? (
        <Fragment>
            <Header />
            <SearchBar onTracksChange={handleTracksChange} />
          <Playlist
            onAudioChange={handleAudioChange}
            onTracksChange={handleTracksChange}
            tracks={tracks}
          />
          <MediaPlayer {...audio} />
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

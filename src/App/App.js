import { useState, useEffect, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import Playlist from "../Playlist/Playlist";
import Musify from "../Utilities/index";
import Login from "../Login/Login";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [playlistName, setPlaylistName] = useState("Playlist Name");
  const [tracks, setTracks] = useState({});

  useEffect(() => setToken(Musify.getAccessToken()), []);

  function handleSearch(result) {
    setSearchResult(result);
  }

  function handlePlaylistName(playlistName) {
    setPlaylistName(playlistName);
  }

  function handleTracks(tracks) {
    setTracks(tracks);
  }

  return (
    <Fragment>
      {token && (
        <div className="App">
          <h1>Welcome to Musify!!!</h1>
          <SearchBar token={token} onHandleSearch={handleSearch} />
          <Playlist
            data={{
              token,
              searchResult,
              playlistName,
              handlePlaylistName,
              handleSearch,
              handleTracks,
            }}
          />
          <MediaPlayer {...tracks} />
        </div>
      )}
      {!token && <Login />}
    </Fragment>
  );
}

export default App;

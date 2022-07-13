import { useState, useEffect, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import Playlist from "../Playlist/Playlist";
import Musify from "../Utilities/index";
import Login from "../Login/Login";
import "./App.css";
import Logo from "./logo.jpg"

function App() {
  const [token, setToken] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
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
          <img src={Logo} alt="" width="320" height="130"/>
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

import { useState, Fragment } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MediaPlayer from "../components/MediaPlayer/MediaPlayer";
import Playlist from "../components/Playlist/Playlist";
import Login from "../components/Login/Login";
import Header from "../components/Header/Header";
import Musify from "../utils";
import "./App.css";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [tracks, setTracks] = useState({});

  const token = Musify.getAccessToken();

  const handleSearch = (result, { clearTracks = false } = {}) =>
    clearTracks
      ? setSearchResult(result)
      : setSearchResult([...result, ...searchResult]);

  const handlePlaylistName = (playlistName) => setPlaylistName(playlistName);
  const handleTracks = (tracks) => setTracks(tracks);

  return (
    <Fragment>
      {token && (
        <div className="App">
          <Header />
          <SearchBar onSearch={handleSearch} />
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
          <MediaPlayer {...tracks} defaultTrack={searchResult[0]} />
        </div>
      )}
      {!token && <Login />}
    </Fragment>
  );
}

export default App;

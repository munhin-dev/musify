import { useState, useEffect, Fragment } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MediaPlayer from "../MediaPlayer/MediaPlayer";
import Playlist from "../Playlist/Playlist";
import Musify from "../Utilities/index";
import Login from "../Login/Login";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => setToken(Musify.getAccessToken()), []);

  return (
    <Fragment>
      {token ? (
        <div className="App">
          <h1>Welcome to Musify!!!</h1>
          <SearchBar token={token} />
          <MediaPlayer />
          <Playlist />
        </div>
      ) : (
        <Login />
      )}
    </Fragment>
  );
}

export default App;

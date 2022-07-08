import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import MediaPlayer from '../MediaPlayer/MediaPlayer'
import Playlist from '../Playlist/Playlist'

function App() {
  return (
    <div className="App">
      <SearchBar />
      <MediaPlayer />
      <Playlist />
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";
import "./MediaPlayer.css";
import Cookies from "js-cookie";

function MediaPlayer({ preview_url: url, artists, name, album }) {
  const [audio, setAudio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const renderCount = useRef(0);

  let artwork = album?.images[0].url;
  let artist = (artists || [])[0]?.name;

  useEffect(() => {
    setAudio(new Audio(url));
    Cookies.set("lastPlayed", JSON.stringify({ url, artist, artwork, name }));
    // eslint-disable-next-line
  }, [url]);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("ended", () => {
      setPlaying(false);
    });
    audio.addEventListener("timeupdate", handleUpdate);
    renderCount.current > 2 ? audio.play().then(() => setPlaying(true)) : renderCount.current++;
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", handleUpdate);
      audio.pause();
    };
  }, [audio]);

  const handleChange = (event) => {
    audio.muted = true;
    audio.currentTime = (audio.duration * event.target.value) / 100;
    setProgress(event.target.value);
  };

  const handlePlaying = () => {
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const handleCommit = () => (audio.muted = false);

  if (!url && Cookies.get("lastPlayed")) {
    const lastPlay = JSON.parse(Cookies.get("lastPlayed"));
    url = lastPlay.url;
    artwork = lastPlay.artwork;
    name = lastPlay.name;
    artist = lastPlay.artist;
  }

  if (!url) return;

  return (
    <div className="media-player">
      <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", backgroundColor: "#343A40" }}>
        <CardMedia component="img" sx={{ width: 90, height: 90 }} image={artwork} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="div" variant="h6" sx={{ mt: 1, fontWeight: "bold", fontSize: 20 }}>
            {name}
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ color: "#ADB5BD", fontSize: 12 }}>
            {artist}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
            <IconButton onClick={handlePlaying}>{playing ? <PauseIcon sx={{ height: 38, width: 38, color: "white" }} /> : <PlayArrowIcon sx={{ height: 38, width: 38, color: "white" }} />}</IconButton>
            <Slider size="small" value={progress} onChange={handleChange} onChangeCommitted={handleCommit} min={0} max={100} sx={{ width: 450, color: "white" }} />
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default MediaPlayer;

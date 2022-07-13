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

function MediaPlayer({ preview_url: url, artists, name, album }) {
  const [audio, setAudio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const renderCount = useRef(0);

  const artwork = album?.images[0].url;
  const artist = (artists || [])[0]?.name;

  useEffect(() => {
    setAudio(new Audio(url));
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

  if (!url) {
    return <div></div>;
  }

  return (
    <div className="media-player">
      <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <CardMedia component="img" sx={{ width: 128, height: 128 }} image={artwork} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography component="div" variant="h6" sx={{ my: 1 }}>
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {artist}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, mx:1 }}>
            <IconButton onClick={handlePlaying}>{playing ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}</IconButton>
            <Slider size="small" color="secondary" value={progress} onChange={handleChange} onChangeCommitted={handleCommit} min={0} max={100} sx={{ width: 450 }} />
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default MediaPlayer;

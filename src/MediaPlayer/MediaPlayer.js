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

  Cookies.set("lastPlayed", JSON.stringify({ url, artist, artwork, name }));

  useEffect(() => {
    setAudio(new Audio(url));
  }, [url]);

  useEffect(() => {
    const handleUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setProgress(0);
    });
    audio.addEventListener("timeupdate", handleUpdate);
    renderCount.current > 1
      ? audio.play().then(() => setPlaying(true))
      : renderCount.current++;
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
      audio.removeEventListener("timeupdate", handleUpdate);
      audio.pause();
      setPlaying(false);
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
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 110,
          backgroundColor: "#343A40",
        }}
      >
        <CardMedia component="img" sx={{ width: 90 }} image={artwork} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            maxWidth: 450,
            mx: 1,
            zIndex: 1,
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <Typography
              className={playing && name.length > 30 ? "auto-scroll" : ""}
              component="div"
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: "bold",
                fontSize: "1em",
                height: 20,
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </Typography>
          </div>

          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "#ADB5BD", fontSize: "0.8em" }}
          >
            {artist}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
            <IconButton onClick={handlePlaying}>
              {playing ? (
                <PauseIcon sx={{ color: "white" }} />
              ) : (
                <PlayArrowIcon sx={{ color: "white" }} />
              )}
            </IconButton>
            <Slider
              size="small"
              value={progress}
              onChange={handleChange}
              onChangeCommitted={handleCommit}
              min={0}
              max={100}
              sx={{ color: "white" }}
            />
          </Box>
        </Box>
      </Card>
    </div>
  );
}

export default MediaPlayer;

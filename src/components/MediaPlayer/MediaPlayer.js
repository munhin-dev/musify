import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Slider from "@mui/material/Slider";
import Musify from "../../utils";
import "./MediaPlayer.css";

function MediaPlayer({ preview_url: url, artists, name, album }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const firstRender = useRef(true);
  const audio = useRef(null);

  let artwork = album?.images[0].url;
  let artist = (artists || [])[0]?.name;

  useEffect(() => {
    audio.current = new Audio(url);
    const handleUpdate = () => {
      setProgress((audio.current.currentTime / audio.current.duration) * 100);
    };
    const handleEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    audio.current.addEventListener("ended", handleEnd);
    audio.current.addEventListener("timeupdate", handleUpdate);
    firstRender.current
      ? (firstRender.current = false)
      : audio.current.play().then(() => setPlaying(true));
    return () => {
      audio.current.removeEventListener("ended", handleEnd);
      audio.current.removeEventListener("timeupdate", handleUpdate);
      audio.current.pause();
    };
  }, [url]);

  const handleChange = (event) => {
    audio.current.muted = true;
    audio.current.currentTime =
      (audio.current.duration * event.target.value) / 100;
    setProgress(event.target.value);
  };

  const handlePlaying = () => {
    playing ? audio.current.pause() : audio.current.play();
    setPlaying(!playing);
  };

  const handleCommit = () => (audio.current.muted = false);

  if (!url && Musify.getLastPlay()) {
    const lastPlay = JSON.parse(Musify.getLastPlay());
    url = lastPlay.url;
    artwork = lastPlay.artwork;
    name = lastPlay.name;
    artist = lastPlay.artist;
  }

  if (!url) return;

  return (
    <div className="MediaPlayer">
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
              className={playing && name.length > 28 ? "auto-scroll" : ""}
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handlePlaying}>
              {playing ? (
                <PauseIcon
                  sx={{ color: "white", width: "1.5em", height: "1.5em" }}
                />
              ) : (
                <PlayArrowIcon
                  sx={{ color: "white", width: "1.5em", height: "1.5em" }}
                />
              )}
            </IconButton>
            <Slider
              className="slider"
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

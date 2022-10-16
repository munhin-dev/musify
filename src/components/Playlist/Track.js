import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Track.css";
import Musify from "../../utils";

function Track(props) {
  const { track, onRemove, onAudioChange, index } = props;

  const trackLength = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const handleAudioChange = () => {
    const url = track.preview_url;
    const name = track.name;
    const artwork = track.album.images[2].url;
    const artist = track.artists[0].name;
    Musify.saveLastPlay(url, artist, artwork, name);
    onAudioChange(track);
  };

  const handleRemove = (event, id) => {
    event.stopPropagation();
    onRemove(id);
  };

  return (
    <tr className="Track" onClick={handleAudioChange}>
      <td className="col-1">
        <div className="position-relative" style={{ top: "-15px" }}>
          <p className="num m-0 position-absolute">{index + 1}</p>
          <div className="play-btn position-absolute">
            <PlayArrowIcon sx={{ color: "white" }} />
          </div>
        </div>
      </td>
      <td className="col-10 col-md-6">
        <div className="d-flex align-items-center">
          <img className="cover-art" src={track.album.images[2].url} alt="" />
          <div className="mx-2 text-start">
            <p className="mb-0">{track.name}</p>
            <h6 className="text-muted mb-0">
              <small>{track.artists[0].name}</small>
            </h6>
          </div>
        </div>
      </td>

      <td className="col-3">
        <div className="d-none d-md-block">{track.album.name}</div>
      </td>
      <td className="col-1">
        <div className="d-none d-md-block">
          {trackLength(track.duration_ms)}
        </div>
      </td>
      <td className="col-1">
        <RemoveCircleOutlineIcon
          className="remove-btn"
          onClick={(event) => handleRemove(event, track.id)}
          sx={{ color: "#ADB5BD" }}
        />
      </td>
    </tr>
  );
}

export default Track;

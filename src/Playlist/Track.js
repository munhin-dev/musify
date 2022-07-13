import Stack from '@mui/material/Stack';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './Track.css'

function Track(props) {

  const { track, idx, removeTrack, handleTracks } = props.data;

  const runtime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <Stack mt={2}>
      <div className="track-container">
        <div className="num-play-wrapper">
          <h4 className="num">{idx + 1}</h4>
          <div className="play-btn" onClick={() => handleTracks(track)}>
            <PlayArrowIcon />
          </div>
        </div>
        <img src={track.album.images[2].url} alt="" />
        <div className="name-artist-wrapper">
          <h5 className="track-name">{track.name}</h5>
          <p>{track.artists[0].name}</p>
        </div>
        <p>{track.album.name}</p>
        <p>{runtime(track.duration_ms)}</p>
        <div className="remove-btn">
          <RemoveCircleOutlineIcon
            onClick={() => removeTrack(idx)}
            style={{ margin: `auto 0` }}
          />
        </div>
      </div>
    </Stack>
  );
}

export default Track
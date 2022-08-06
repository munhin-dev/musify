import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import SearchButton from "./SearchButton";
import SurpriseMeButton from "./SurpriseMeButton";
import { inputLabelClasses } from "@mui/material/InputLabel";
import Musify from "../../utils";
import axios from "axios";
import "./SearchBar.css";

export default function SearchBar({ onTracksChange }) {
  let [options, setOptions] = useState([]);
  let [selected, setSelected] = useState([]);

  const handleChange = async (event) => {
    const query = event.target.value.split(" ").join("%20");
    const headers = Musify.setHeaders();
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&limit=8`,
      headers
    );
    let results = data.artists.items.concat(data.tracks.items);
    setOptions(results);
  };

  const handleSelect = (_, selections) => setSelected(selections);

  return (
    <div className="SearchBar container mt-1">
      <Autocomplete
        className="col-11 autocomplete"
        multiple
        size="small"
        options={options}
        getOptionDisabled={() => selected.length >= 5}
        onChange={(_, selections) => handleSelect(_, selections)}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <img
              alt=""
              src={
                option.type === "artist"
                  ? option?.images[2]?.url
                  : option?.album.images[2]?.url
              }
              width="40"
              height="40"
            ></img>
            <div className="details-wrapper">
              <div className="title">{option.name}</div>
              <div className="type">
                {option.type[0].toUpperCase() + option.type.slice(1)}
              </div>
            </div>
          </li>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              color={option.type === "artist" ? "primary" : "success"}
            />
          ))
        }
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            className="inputBox"
            {...params}
            outline="none"
            onChange={handleChange}
            placeholder={
              selected.length === 0 ? "Enter up to 5 tracks or artists" : ""
            }
            InputLabelProps={{
              shrink: false,
              sx: {
                color: "#CAD2C5",
                [`&.${inputLabelClasses.shrink}`]: {
                  color: "orange",
                },
              },
            }}
            sx={{
              backgroundColor: "white",
            }}
          />
        )}
        sx={{
          m: "auto",
          "& .MuiAutocomplete-inputRoot": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          maxWidth: 750,
        }}
      />
      <SearchButton selected={selected} onTracksChange={onTracksChange} />
      <SurpriseMeButton onTracksChange={onTracksChange} />
    </div>
  );
}

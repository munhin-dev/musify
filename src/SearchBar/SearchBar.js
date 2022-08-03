import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./SearchBar.css";
import SearchButton from "./SearchButton";
import SurpriseMeButton from "./SurpriseMeButton";
import { inputLabelClasses } from "@mui/material/InputLabel";

const axios = require("axios");

export default function SearchBar(props) {
  let [searchResult, setSearchResult] = useState([]);
  let [selectedResult, setSelectedResult] = useState([]);

  function handleChange(e) {
    const query = e.target.value.split(" ").join("%20");
    const token = props.token;
    const headers = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&limit=8`,
        headers
      )
      .then((res) => {
        let data = res.data.artists.items.concat(res.data.tracks.items);
        setSearchResult(data);
      })
      .catch((err) => console.log(err));
  }

  function handleTxtChange(_, newValue) {
    setSelectedResult(newValue);
  }

  return (
    <div className="container">
      <Autocomplete
        className="col-11 rounded"
        multiple
        id="tags-standard"
        options={searchResult}
        getOptionDisabled={() => selectedResult.length >= 5}
        onChange={(_, val) => handleTxtChange(_, val)}
        renderOption={(props, option) => (
          <li {...props}>
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
            placeholder="Enter up to 5 tracks or artists"
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
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          },
          maxWidth: 750,
        }}
      />
      <SearchButton
        selectedResult={selectedResult}
        onHandleSearch={props.onHandleSearch}
      />
      <SurpriseMeButton onHandleSearch={props.onHandleSearch} />
    </div>
  );
}

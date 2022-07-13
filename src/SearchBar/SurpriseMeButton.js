import * as React from 'react';
import Button from '@mui/material/Button';
import Cookie from 'js-cookie'

const axios = require('axios')

async function getUserRecommendation(artistLimit, trackLimit){
  const token = Cookie.get("token");
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  };
  let data = []
  let seedArtist = []
  let seedTrack = []

  await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=${artistLimit}`, headers).then((response) => {
    response.data.items.forEach(result => data.push(result))
  })

  await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=${trackLimit}`, headers).then((response) => {
      response.data.items.forEach(result => data.push(result))
  })

  data.forEach(result => {
    if (result.type === 'artist'){
      seedArtist.push(result.id)
    } else {
      seedTrack.push(result.id)
    }
  })

  let result = await axios.get(`https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${seedArtist.join(',')}&seed_tracks=${seedTrack.join(',')}`, headers)

  return result.data.tracks
}

function handleClick(onHandleSearch){
  let randomArtistLimit = Math.floor(Math.random() *  5 + 1)
  let randomTrackLimit = 5 - randomArtistLimit
  let userRecommendation = getUserRecommendation(randomArtistLimit, randomTrackLimit)
  userRecommendation.then((response) => onHandleSearch(response.filter(track => track.preview_url !== null)))
}

export default function SearchButton({onHandleSearch}) {
  return (
    <Button 
    variant="contained"
    onClick={() => handleClick(onHandleSearch)} 
    disableElevation
    sx={{
      marginTop: 5,
      marginLeft: 5
    }}>
      Surprise Me
    </Button>
  );
}
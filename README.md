# Musify

Musify is a web based app made to give you recommendations from spotify based on your input. The results can be previewed and removed or it can be add as a new playlist into your library. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Run Musify

Currently, Musify is still in development so the app can only be runs in development mode. To do that, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## How To Use

To access the web app, users must first login into Spotify and will be redirected to the main page. There are three main components to the app the Searchbar, Playlist and Player. Below you can find the use examples for each component.

### `Searchbar`

To make a search, type your desired input and confirm by selecting an option from the autocomplete dropdown list. The searchbar will only accept up to five (5) chips, once the limit is reached the autocomplete dropdown list will be disabled. Click "SEARCH" to generate a playlist based on your search or click "SURPRISE ME" to get a random playlist based on your profile. 

1. Chips
    - Chips are search inputs that is selected from the autocomplete dropdown list.
    - You can remove a chip by clicking on the "x" button on the right of the chip.
    - Chips are color coded, Blue for Artist and Green for Songs.

2. Autocomplete dropdown list
    - The autocomplete dropdown list is to assist in selecting the right search item.
    - The list will be populated by tracks and artist most relevent to your search input.
    - You can toggle the dropdown by click the up or down button on the right of the searchbar.

### `Playlist`

The Playlist will be automatically populated with the user's top 15 songs. After clicking the "SEARCH" or "SURPRISE ME" button, the Playlist will be update with the new results. The Playlist can be saved by clicking the "SAVE" button or emptied by clicking the "CLEAR" button. To name the Playlist, click on the text "Playlis Name..." and you will be able to input any name.

1. Playlist items
    - Each item in the Playlist will display # (number), TITLE (album art,song title & artist), ALBUM (album name) and TIMER ICON (song runtime)
    - Hovering the cursor over each individual item will display a REMOVE button, click it to remove the specific item.
    - Hovering the cursor over each number will display a PLAY button, click it to play a preview of the song.
    - Clicking on anywhere EXCEPT the REMOVE button will play a preview of the song.

### `Player`

The Player is at the bottom of the page and displays the information of the current song (song name, artist & album art). You can play or pause by clicking the PLAY/PAUSE button on the right of the album art. If a song is currently playing while a new search is made the current song will continue to display and play in the Player.

1. Playback Bar
    - You can click anywhere on the Playback Bar and set the point you would like to listen from.
    - Alternatively, you can also drag the round pointer to set the point.
    - When the preview has ended, clicking the PlAY button again will reset the round pointer to the start of the bar.

## Authors & Acknowledgment

### `Authors`
- Ken
- Mun Hin
- Edmund

### `Acknowledgment`

We would like to thank DT for teaching us the fundamentals required to get started on this project as well as supporting us while working on this.
import Cookie from "js-cookie";
const clientId = "9868d45c684c48c197e1ec8bf128367f";
const redirectUri = "https://musify-69685.surge.sh/";
export const loginUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=playlist-modify-public%20playlist-read-collaborative%20playlist-read-private%20playlist-modify-private%20user-top-read&redirect_uri=${redirectUri}&show_dialog=true`;

const Musify = {
  getAccessToken() {
    let token = Cookie.get("token");
    if (!token && window.location.hash) {
      token = window.location.hash.split("&")[0].split("=")[1];
      window.history.replaceState(null, null, " ");
      Cookie.set("token", token, {
        expires: new Date(Date.now() + 55 * 60 * 1000),
      });
    }
    return token;
  },

  setHeaders() {
    const token = Cookie.get("token");
    if (!token) {
      window.location.href = "/";
      return;
    }
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  },

  saveLastPlay(url, artist, artwork, name) {
    Cookie.set("lastPlayed", JSON.stringify({ url, artist, artwork, name }));
  },

  getLastPlay() {
    return Cookie.get("lastPlayed");
  },
};

export default Musify;

/**API */
import { key } from "./key.js";
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      key,
  },
};

export async function getNowPlayingMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR",
    option
  );
  return res.json();
}

export async function getMovies(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
    option
  );
  return res.json();
}

export async function getSearch(movieSearch) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie??query=${movieSearch}include_adult=false&language=ko&page=1region=KR`,
    option
  );
  return res.json();
}

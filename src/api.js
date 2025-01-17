/**API */
import { key } from "./key.js";
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: key,
  },
};

export async function getNowPlayingMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR`,
      option
    );
    return res.json();
  } catch {
    console.log("getNowPlaying : ", error);
  }
}

export async function getMovies(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
      option
    );
    return res.json();
  } catch {
    console.log("getMovie : ", error);
  }
}

export async function getSearch(movieSearch) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=false&language=ko&page=1&region=KR`,
      option
    );
    return res.json();
  } catch (error) {
    console.log("getSearch : ", error);
  }
}

export async function getPopular() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko&page=1&region=KR`,
      option
    );
    return res.json();
  } catch (error) {
    console.log("getPopular : ", error);
  }
}

export async function getDetails(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
      option
    );
    return res.json();
  } catch (error) {
    console.log("getPopular : ", error);
  }
}

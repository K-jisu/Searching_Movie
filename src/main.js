import { getNowPlayingMovies } from "./api.js";
// movies 데이터
const movies = [];

const input = document.getElementById("header__input");

input.addEventListener("keyup", () => {
  searchMovie();
});

const postMovie = async () => {
  try {
    const data = await getNowPlayingMovies();
    data.results.forEach((movie) => {
      const movieData = {
        id: movie.id,
        title: movie.title,
        detail: movie.overviw,
        poster: movie.poster_path,
        average: movie.vote_average,
        date: movie.release_date,
      };
      movies.push(movieData);

      const sectionCard = document.createElement("div");
      sectionCard.classList.add("section__card");

      const template = `
      <div class="section__image">
        <img src = "https://image.tmdb.org/t/p/w200/${movieData.poster}" alt = "poster"/>
      </div>
      <div class="section__info">
        <h2 class="section__moviename">${movieData.title}</h2>
        <p>평점 : ${movieData.average}</p>
      </div>`;
      sectionCard.innerHTML = template;
      document.getElementById("section").appendChild(sectionCard);
    });
  } catch (error) {
    console.log(error);
  }
};
postMovie();

const searchMovie = () => {
  const search = input.value;
  // section__card를 가져옴
  const sectCard = document.querySelectorAll(".section__card");
  // console.log(sectCard)
  for (const sectName of sectCard) {
    // section__card에서 section__moviename을 가져옴
    const movieName = sectName.querySelector(".section__moviename").innerHTML.normalize("NFKD")
    // section__moviename에 search값이 있으면 filtered 제거 없으면 filtered 추가.
    // console.log(movieName)
    if (movieName.includes(search.normalize("NFKD"))) {
      sectName.classList.remove("filtered");
      console.log("filtered")
    } else {
      sectName.classList.add("filtered");
    }
  }
};

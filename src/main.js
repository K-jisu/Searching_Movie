import { getNowPlayingMovies } from "./api.js";

const postMovie = async () => {
  try {
    const data = await getNowPlayingMovies();
    console.log(data.results);
    data.results.forEach((movie) => {
      const movieId = movie.id;
      const movieTitle = movie.title;
      const movieDetail = movie.overviw;
      const moviePoster = movie.poster_path;
      const movieAverage = movie.vote_average;
      const movieDate = movie.release_date;

      const sectionCard = document.createElement("div");
      sectionCard.classList.add("section__card");

      const template = `
        <div class="section__image">
          <img src = "https://image.tmdb.org/t/p/w200/${moviePoster}" alt = "poster"/>
        </div>
          <div class="section__info">
            <h2 class="section__moviename">${movieTitle}</h2>
            <p>평점 : ${movieAverage}</p>
          </div>`
      sectionCard.innerHTML = template;
      document.getElementById("section").appendChild(sectionCard);
    });
  } catch (error) {
    console.log(error);
  }
};
postMovie();
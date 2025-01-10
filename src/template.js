export const template = (movielist) => {
  movielist.forEach((movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      detail: movie.overviw,
      poster: movie.poster_path,
      average: movie.vote_average,
      date: movie.release_date,
    };
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
};

export const template = (movielist) => {
  movielist.forEach((movie) => {
    const movieData = {
      id: movie.id,
      title: movie.title,
      detail: movie.overview,
      poster: movie.poster_path,
      average: movie.vote_average,
      date: movie.release_date,
    };

    const sectionContiner = document.createElement("div");
    sectionContiner.classList.add("section__container");

    const template = `
    <div class = "section__card" mid=${movieData.id}>
      <div class="section__image">
      <img src = "https://image.tmdb.org/t/p/w200/${movieData.poster}" alt = "poster"/>
      </div>
      <div class="section__info">
      <h2 class="section__moviename">${movieData.title}</h2>
      <p>평점 : ${movieData.average}</p>
      </div>
      </div>`;
    sectionContiner.innerHTML = template;
    document.getElementById("section").appendChild(sectionContiner);
  });
};

export const modalTemplate = (movieId) => {
  const movie = {
    title: movieId.title,
    poster: movieId.poster_path,
    detail: movieId.overview,
    average: movieId.vote_average,
    date: movieId.release_date,
  };
  return `
        <div class="modal__content">
          <div class="modal__img">
            <img src = "https://image.tmdb.org/t/p/w400/${movie.poster}" alt = "poster"/>
          </div>
          <div class="modal__info">
            <h2 class="modal__title">${movie.title}</h2>
            <p class="modal__desc">${movie.detail}</p>
            <h3 class="modal__date">개봉일 : ${movie.date}</h3>
            <h3 class="modal__rating">평점 : ${movie.average}</h3>
          </div>
          <button id="addBookmark" class="modal__bookmark">북마크 추가</button>
        </div>
`;
};

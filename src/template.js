export const template = (movielist) => {
  movielist.forEach((movie) => {
    // 구조분해할당 알아보기
    const { id, title, poster_path, vote_average } = movie;

    const sectionContiner = document.createElement("div");
    sectionContiner.classList.add("section__container");

    const template = `
    <div class = "section__card" mid=${id}>
      <div class="section__image">
      <img src = "https://image.tmdb.org/t/p/w200/${poster_path}" alt = "poster"/>
      </div>
      <div class="section__info">
      <h2 class="section__moviename">${title}</h2>
      <p>평점 : ${vote_average}</p>
      </div>
      </div>`;
    sectionContiner.innerHTML = template;
    document.getElementById("section").appendChild(sectionContiner);
  });
};

export const modalTemplate = (movie) => {
  const { id, title, overview, poster_path, vote_average, release_date } = movie;
  return `
        <div id="modal__container" class="modal__content" mid=${id}>
          <div class="modal__img">
            <img src = "https://image.tmdb.org/t/p/w400/${poster_path}" alt = "poster"/>
          </div>
          <div class="modal__info">
            <h2 class="modal__title">${title}</h2>
            <p class="modal__desc">${overview}</p>
            <h3 class="modal__date">개봉일 : ${release_date}</h3>
            <h3 class="modal__rating">평점 : ${vote_average}</h3>
          </div>
          <button id="bookmark" class="modal__bookmark">북마크 추가</button>
        </div>
`;
};

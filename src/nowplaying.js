import { getNowPlayingMovies, getDetails } from "./api.js";
import { template, modalTemplate } from "./template.js";

const input = document.getElementById("header__input");
const section = document.getElementById("section");

const postMovie = async () => {
  try {
    const data = await getNowPlayingMovies();
    const movielist = data.results;
    template(movielist);
  } catch (error) {
    console.log(error);
  }
};
postMovie();

input.addEventListener("keyup", (e) => {
  // section.innerHTML = ""
  searchMovie();
});

// nowPlaying 중에서 search 하기
const searchMovie = () => {
  const search = input.value;
  // section__card를 가져옴
  const sectCard = document.querySelectorAll(".section__card");
  // console.log(sectCard)
  for (const sectName of sectCard) {
    // section__card에서 section__moviename을 가져옴
    const movieName = sectName
      .querySelector(".section__moviename")
      .innerHTML.normalize("NFKD");
    // section__moviename에 search값이 있으면 filtered 제거 없으면 filtered 추가.
    // console.log(movieName)
    if (movieName.includes(search.normalize("NFKD"))) {
      sectName.classList.remove("hidden");
    } else {
      sectName.classList.add("hidden");
    }
  }
};

const modalID = document.getElementById("modal");

// 모달 구현해야지
section.addEventListener("click", async (e) => {
  const sectionTarget = e.target.closest(".section__card");
  if (sectionTarget) {
    const sectionTargetId = +sectionTarget.getAttribute("mid");
    const getData = await getDetails(sectionTargetId);
    modalID.innerHTML = modalTemplate(getData);
    document.body.style.overflow = "hidden";
    modalID.classList.remove("hidden");
  }
});
modalID.addEventListener("click", (e) => {
  if (!e.target.closest(".modal__content")) {
    modalID.classList.add("hidden");
  }
});

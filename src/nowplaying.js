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
  const sectCard = document.querySelectorAll(".section__container");
  // console.log(sectCard)
  for (const sectionName of sectCard) {
    // section__card에서 section__moviename을 가져옴
    const movieName = sectionName
      .querySelector(".section__moviename")
      .innerHTML.normalize("NFKD");
    // section__moviename에 search값이 있으면 filtered 제거 없으면 filtered 추가.
    // console.log(movieName)
    if (movieName.includes(search.normalize("NFKD"))) {
      sectionName.classList.remove("hidden");
    } else {
      sectionName.classList.add("hidden");
    }
  }
};

const modalID = document.getElementById("modal");

section.addEventListener("click", async (e) => {
  const sectionTarget = e.target.closest(".section__card");
  if (!sectionTarget) {
    return;
  } else if (sectionTarget) {
    const movieId = +sectionTarget.getAttribute("mid");
    const getData = await getDetails(movieId);
    modalID.innerHTML = modalTemplate(getData);
    document.body.style.overflow = "hidden";
    modalID.classList.remove("hidden");
  }
});

// 북마크 추가
let idArr = [];
modalID.addEventListener("click", (e) => {
  const closestBookmark = e.target.closest("#bookmark");

  // 북마크 버튼 누를때
  if (closestBookmark) {
    const bookmarkBtn = document.getElementById("bookmark");
    const modalConatiner = document.getElementById("modal__container");
    const movieId = +modalConatiner.getAttribute("mid");
    const LocalData = JSON.parse(localStorage.getItem("id"));
    let localIdList = LocalData === null ? [] : [...LocalData];
    // 북마크 id 중첩 제거
    if (localIdList.includes(movieId)) {
      window.localStorage.clear();
      alert("북마크가 제거되었습니다.")
      // bookmarkBtn.classList.remove("marked")
      // bookmarkBtn.classList.add("unmarked")
      idArr = [];
      localIdList = localIdList.filter((item) => item !== movieId);
      localIdList.forEach((id) => {
        idArr.push(+id);
      });
      localStorage.setItem("id", JSON.stringify([...idArr]));
    } else {
      alert("북마크가 추가되었습니다.")
      // bookmarkBtn.classList.remove("unmarked")
      // bookmarkBtn.classList.add("marked")
      idArr.push(+movieId);
      localStorage.setItem("id", JSON.stringify([...idArr]));
    }
  }

  // 모달 창 닫기
  if (!e.target.closest(".modal__content")) {
    modalID.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});
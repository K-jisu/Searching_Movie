import { getSearch, getPopular, getDetails } from "./api.js";
import { modalTemplate, template } from "./template.js";

const input = document.getElementById("header__input");
const section = document.getElementById("section");
const modalID = document.getElementById("modal");
const goBookMark = document.getElementById("gobookmark");

// search 기능
// debounce 추가
let debounceTimer;
input.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    section.innerHTML = "";
    const filteredMovie = await getSearch(e.target.value);
    const value = filteredMovie.results;
    template(value);
    if (e.target.value.length === 0) {
      postMovie();
    }
  }, 500);
});

// popular 카드 보여주기
const postMovie = async () => {
  try {
    const data = await getPopular();
    const movielist = data.results;
    template(movielist);
  } catch (error) {
    console.log(error);
  }
};
postMovie();

// 모달 UI
section.addEventListener("click", async (e) => {
  const sectionTarget = e.target.closest(".section__card");
  if (!sectionTarget) {
    return;
  } else if (sectionTarget) {
    const sectionTargetId = +sectionTarget.getAttribute("mid");
    const getData = await getDetails(sectionTargetId);
    modalID.innerHTML = modalTemplate(getData);
    document.body.style.overflow = "hidden";
    modalID.classList.remove("hidden");
  }
});

// 북마크 추가
const idArr = new Set();
modalID.addEventListener("click", (e) => {
  const bookMarkBtn = e.target.closest("#bookmark");
  // 북마크 버튼 누를때
  if (bookMarkBtn) {
    const modalConatiner = document.getElementById("modal__container");
    const movieId = modalConatiner.getAttribute("mid");
    idArr.add(+movieId);
    localStorage.setItem("id", JSON.stringify([...idArr]));
  }
  // 모달 창 닫기
  if (!e.target.closest(".modal__content")) {
    modalID.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
});

// 북마크 확인하기
goBookMark.addEventListener("click", async () => {
  section.innerHTML = "";
  const LocalData = localStorage.getItem("id");
  const idList = [...JSON.parse(LocalData)];
  const dataList = await Promise.all(
    idList.map(async (movieId) => {
      const res = await getDetails(movieId);
      return res;
    })
  );
  template(dataList);
});

// 무한 스크롤 만들어야지
// 할게 많구만

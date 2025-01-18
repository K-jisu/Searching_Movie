import { getSearch, getPopular, getDetails } from "./api.js";
import { modalTemplate, template } from "./template.js";

const input = document.getElementById("header__input");
const section = document.getElementById("section");
const modalID = document.getElementById("modal");
const goBookMark = document.getElementById("gobookmark");
let bookMarkStat = false;

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

const getLocalData = async () => {
  const LocalData = localStorage.getItem("id");
  const localIdList = [...JSON.parse(LocalData)];
  const dataList = await Promise.all(
    localIdList.map(async (movieId) => {
      const res = await getDetails(movieId);
      return res;
    })
  );
  console.log(dataList);
  return dataList;
};

// 모달 UI
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
modalID.addEventListener("click", async (e) => {
  const closestBookmark = e.target.closest("#bookmark");

  // 북마크 버튼 누를때
  if (closestBookmark) {
    const modalConatiner = document.getElementById("modal__container");
    const movieId = +modalConatiner.getAttribute("mid");
    const LocalData = JSON.parse(localStorage.getItem("id"));
    let localIdList = LocalData === null ? [] : [...LocalData];
    // 북마크 id 중첩 제거
    if (localIdList.includes(movieId)) {
      window.localStorage.clear();
      alert("북마크가 제거되었습니다.");
      idArr = [];
      localIdList = localIdList.filter((item) => item !== movieId);
      localIdList.forEach((id) => {
        idArr.push(+id);
      });
      localStorage.setItem("id", JSON.stringify([...idArr]));
      if (bookMarkStat === true) {
        modalID.classList.add("hidden");
        section.innerHTML = "";
        let LocalDataList = await getLocalData();
        template(LocalDataList);
      }
    } else {
      alert("북마크가 추가되었습니다.");
      idArr.push(+movieId);
      localStorage.setItem("id", JSON.stringify([...idArr]));
      if (bookMarkStat === true) {
        let LocalDataList = await getLocalData();
        template(LocalDataList);
      }
    }
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
  bookMarkStat = true;
  let dataList = await getLocalData();
  template(dataList);
});

// window.onload = function () {
//   const sectionCardList = [...document.getElementsByClassName("section__card")];

//   sectionCardList.forEach((card) => {
//     const id = +card.getAttribute("mid");
//   });
// console.log(movieIdList)
// console.log(localIdList);
// };

// console.log(localIdList);

// 무한 스크롤 만들어야지
// 할게 많구만
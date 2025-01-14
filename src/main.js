import { getSearch, getPopular, getDetails } from "./api.js";
import { modalTemplate, template } from "./template.js";

const input = document.getElementById("header__input");
const section = document.getElementById("section");
const modalID = document.getElementById("modal");
const sectionCard = document.getElementsByClassName("section__card");
// search 기능
input.addEventListener("keyup", async (e) => {
  section.innerHTML = "";
  const filteredMovie = await getSearch(e.target.value);
  const value = filteredMovie.results;
  template(value);
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


// 모달 구현해야지
section.addEventListener("click", async (e) => {
  const secTarget = e.target.closest(".section__card")
  const secTargetId = +secTarget.getAttribute("mid")
  if (secTarget) {
    const getData = await getDetails(secTargetId)
    modalID.innerHTML = modalTemplate(getData)
    document.body.style.overflow = "hidden"
    console.log(secTargetId)
    console.log(getData)
    modalID.classList.remove("dpn");
    
  }
});
modalID.addEventListener("click", (e) => {
  if (!e.target.closest(".modal__content")) {
    modalID.classList.add("dpn");
  }
});


// 무한 스크롤 만들어야지
// 할게 많구만

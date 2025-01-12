import { getSearch, getPopular } from "./api.js";
import { template } from "./template.js";

const input = document.getElementById("header__input");
const section = document.getElementById("section");

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
const modalID = document.getElementById("modal");
section.addEventListener("click", (e)=>{
  // modalID.classList.remove("dpn")
  console.log(e.target)
})
// 모달에 데이터 넣어야지
// 무한 스크롤 만들어야지
// 할게 많구만
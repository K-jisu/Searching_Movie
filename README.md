# Searching_Movie

# 프로젝트 개요

TMDB API를 사용하여 영화를 검색할 수 있는 웹페이지입니다.

# 기능

- 바닐라 자바스크립트로 구현한 프로젝트입니다.
- TMDB API를 사용하여 현재 상영중인 영화와 인기있는 영화 불러왔습니다.
- 디바운싱을 사용하여 API호출을 최소화해 효율적으로 검색할 수 있습니다.
- 상세페이지는 모달을 사용하여 구성했습니다.

# 트러블 슈팅
- [한글 유효성 검사](https://velog.io/@wltn7star/TIL15.-%ED%95%9C%EA%B8%80-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC)
- [받아오는 값이 Promise? 어떻게 해결함?](https://velog.io/@wltn7star/TIL17.-%EB%B0%9B%EC%95%84%EC%98%A4%EB%8A%94-%EA%B0%92%EC%9D%B4-Promise-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%B4%EA%B2%B0%ED%95%A8)
- [HTMLCollection 값은 있는데 length는 0?](https://velog.io/@wltn7star/TIL18.-HTMLCollection-%EA%B0%92%EC%9D%80-%EC%9E%88%EB%8A%94%EB%8D%B0-length%EB%8A%94-0)

# 프로젝트 구조
📁
```
|- assets /
|   |- iamge /
|   |  |- background.jpg 
|   |   
|   |- style /
|      |- 
|
|- src /
|   |- api.js
|   |- key.js
|   |- main.js
|   |- nowplaying.js
|   |- template.js
|
|- nowplaying.html
|- index.html
```

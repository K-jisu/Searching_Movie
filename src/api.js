/**API */
export async function getNowPlayingMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1&region=KR",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDJjZWYzY2E0ZmMyMzkzNWZmMjJlYmMyOTZkZjRkMCIsIm5iZiI6MTczNjI5ODc3MC45ODUsInN1YiI6IjY3N2RkMTEyODlmYzVkOTQ0MjRlNThlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.onmKezQdK2pZe252BOkjXWX4QuaTvU-fa7cpLnROSe0",
      },
    }
  );
  return res.json();
}

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500/";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODA1ODIxYTI3Yjc0ZGVjN2U4YTQ3MTdhZGIxMTgyOSIsIm5iZiI6MTczNDY3OTU4Mi4wNTMsInN1YiI6IjY3NjUxYzFlMDNhM2FhNTMzMDkwY2NkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VUBhmAF3m74K__w_6qUEAwdD1OPkAQLCng7RGSIWOU0";

axios.defaults.baseURL = BASE_URL;

const headers = {
  Authorization: `Bearer ${API_KEY}`
};

const options = {
  headers: headers,
};
export async function fetchTendingMovies() {
  try {
    const response = await axios.get("/trending/movie/day", options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovieCast(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}/credits?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMovieReviews(movieId) {
  try {
    const response = await axios.get(`/movie/${movieId}/reviews?language=en-US`, options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchMovies(query) {
  try {
    const response = await axios.get(`/search/movie`, {
      params: {
        include_adult: false,
        language: 'en-US',
        page: 1,
        query: query
      },
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export function getImgSrc(id) {
  return BASE_IMG_URL + id;
}
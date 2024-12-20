import { useState, useEffect } from "react";

import * as api from "../../components/API";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [today, setToday] = useState(() => {
    return getToday();
  });

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function resolveMovies() {
      const response = await api.fetchTendingMovies();
      setMovies(response.results);
    }
    resolveMovies();
  }, [today]);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

function getToday() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

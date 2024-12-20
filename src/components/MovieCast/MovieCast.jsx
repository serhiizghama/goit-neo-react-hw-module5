import * as api from "../../components/API";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { useState, useEffect } from "react";
import NoPhoto from "../../assets/no-photo.svg";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function resolveMovieCast(movieId) {
      const response = await api.fetchMovieCast(movieId);
      setMovieCast(response.cast);
    }

    resolveMovieCast(movieId);
  }, [movieId]);

  return (
    <ul className={css.movie_cast}>
      {movieCast.map((cast) => singleActor(cast))}
    </ul>
  );
}

function singleActor(actor) {
  return (
    <li key={actor.id} className={css.movie_actor}>
      {actor.profile_path ? (
        <img src={api.getImgSrc(actor.profile_path)} />
      ) : (
        <img src={NoPhoto} />
      )}
      <a>{actor.name}</a>
      <a>Character: {actor.character}</a>
    </li>
  );
}

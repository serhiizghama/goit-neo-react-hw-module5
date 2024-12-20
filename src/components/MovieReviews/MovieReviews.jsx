import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../API";
import css from "./MovieReviews.module.css";
import NoPhoto from "../../assets/no-photo.svg";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function resolveMovieCast(movieId) {
      const response = await api.fetchMovieReviews(movieId);
      setMovieReviews(response.results);
    }

    resolveMovieCast(movieId);
  }, [movieId]);

  return movieReviews && movieReviews.length > 0 ? (
    <ul className={css.review_list}>
      {movieReviews.map((review) => singleActor(review))}
    </ul>
  ) : (
    "No review yet"
  );

  function singleActor(review) {
    return (
      <li key={review.id} className={css.review}>
        <div className={css.header}>
          <div>
            {review.author_details && review.author_details.avatar_path ? (
              <img src={api.getImgSrc(review.author_details.avatar_path)} />
            ) : (
              <img src={NoPhoto} />
            )}
          </div>
          <div className={css.metadata}>
            <a>
              <span>Author:</span> {review.author}
            </a>
            <a>
              <span>Created:</span> {review.created_at}
            </a>
            <a>
              <span>Updated:</span> {review.updated_at}
            </a>
          </div>
        </div>

        <a>
          <span>Review:</span>{" "}
        </a>
        <a>{review.content}</a>
      </li>
    );
  }
}

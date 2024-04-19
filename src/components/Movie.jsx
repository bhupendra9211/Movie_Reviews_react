import { RenderForm } from "./RenderForm";
import { DisplayReview } from "./DisplayReview";
import { useEffect, useState } from "react";
import "./styles.css"; // Import your CSS file

export function Movie({ movie }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (movie?.reviews?.length > 0) {
      setReviews(movie.reviews);
    }
  }, [movie]);

  function reviewAdded(e, reviewText, setComment) {
    e.preventDefault();
    const body = {
      review: {
        review: reviewText,
      },
    };

    fetch(`http://localhost:3000/v1/movies/${movie?.movie_id}/reviews`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "default",
    }).then((response) => {
      if (response.ok) {
        setReviews([
          ...reviews,
          {
            review: reviewText,
          },
        ]);
        setComment("");
      }
    });
  }

  return (
    <div className="movie-container">
      <div className="movie-card">
        <div className="flex">
          <div className="movie-image">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="movie-details">
            <h2 className="movie-title">{movie.title}</h2>
            {/* Other movie details */}
            <p className="text-lg">
                <strong className="mr-1">Original Title:</strong>
                <span className="text-base text-red-400">
                  {" "}
                  {movie.original_title}
                </span>
              </p>
              <p className="text-lg mb-5">
                <strong className="mr-1">Movie Id:</strong>{" "}
                <span className="text-base text-gray-400"> {movie.movie_id}</span>
              </p>
              <p className="text-lg mb-5">
                <strong className="mr-1">Overview:</strong>{" "}
                <span className="text-base text-gray-400">
                  {" "}
                  {movie.overview}
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Popularity:</strong>
                <span className="text-base text-gray-400">
                  {" "}
                  {movie.popularity}
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Budget:</strong>
                <span className="text-base text-gray-400">
                  {" "}
                  ${movie.budget}
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Duration: </strong>
                <span className="text-base text-gray-400">
                  {" "}
                  {movie.duration} min
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Average vote:</strong>{" "}
                <span className="text-base text-gray-400">
                  {" "}
                  {movie.vote_average}
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Total vote:</strong>
                <span className="text-base text-gray-400">
                  {" "}
                  {movie.vote_count}
                </span>
              </p>
              <p className="text-lg">
                <strong className="mr-1">Status:</strong>
                <span className="text-base text-gray-400"> {movie.status}</span>
              </p>
          </div>
        </div>
        <hr />
        <div className="review-section">
          <p className="review-count">Total review: {reviews?.length}</p>
          <div className="reviews">
            {reviews?.map((review) => (
              <DisplayReview review={review} key={review?.id} />
            ))}
          </div>
          <div className="review-form">
            <RenderForm reviewAdded={reviewAdded} />
          </div>
        </div>
      </div>
    </div>
  );
}

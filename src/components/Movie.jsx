import { RenderForm } from "./RenderForm";
import { DisplayReview } from "./DisplayReview";
import { useEffect, useState } from "react";

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
        description: reviewText,
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
            description: reviewText,
          },
        ]);
        setComment("")
      }
    });
  }

  return (
    <>
      <div className="mt-[5rem] mx-10">
        <div
          key={movie.id}
          className="border rounded-lg p-4 w-full bg-gray-900 text-white shadow-lg mt-4"
        >
          <div className="flex">
            <div className="w-1/3 pr-4 mt-10 ml-5">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div
              className="border-l border-gray-400 ml-20  mt-12"
              style={{ height: "520px" }}
            ></div>
            <div className="w-2/4 pl-4 mt-10 ml-6">
              <h2
                className=" font-bold text-red-600 text-4xl mb-8"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {movie.title}
              </h2>
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
              <p className="text-lg mt-2">
                <strong className="mr-1">Release Date:</strong>
                <span className="text-base text-gray-400">
                  {" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
          <hr className="m-10"></hr>

          
          <p className="mb-5 text-gray-300">
            <span className="text-xl text-red-600">Total review: </span>
            {reviews?.length}
          </p>
          <div className="ml-10 flex">
            <div className="w-[36%] ">
              {reviews?.map((review) => (
                <DisplayReview review={review} key={review?.id} />
              ))}
            </div>

            <div className=" ml-32">
              <RenderForm reviewAdded={reviewAdded} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

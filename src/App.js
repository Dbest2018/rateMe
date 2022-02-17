import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Rating from "./components/Rating";
import RateForm from "./components/RateForm";
import { RatingData } from "./data/RatingData";

function App() {
  const [ratings, setRatings] = useState(RatingData);

  let average =
    ratings.reduce((acc, cur) => {
      return acc + cur.score;
    }, 0) / ratings.length;

  average = average.toFixed(1).replace(/[.,]0$/, "");

  const deleteRating = (id) => {
    if (window.confirm("Are you sure you want to delete? ")) {
      setRatings(ratings.filter((rating) => rating.id !== id));
    }
  };

  const addRatings = (newRatings) => {
    const newRatingsWithId = {
      id: ratings.length + 1,
      ...newRatings,
    };
    setRatings((prevRatings) => [...prevRatings, newRatingsWithId]);
  };

  console.log(ratings);
  return (
    <>
      <Header />
      <div className="container">
        <RateForm addRatings={addRatings} />
        <div className="feedback-stats">
          <h4>{ratings.length} Reviews</h4>
          <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
        {ratings.length > 0 ? (
          ratings.map((rating) => (
            <Rating
              rating={rating}
              key={rating.id}
              handleDelete={deleteRating}
            />
          ))
        ) : (
          <p>No ratings yet</p>
        )}
      </div>
    </>
  );
}

export default App;

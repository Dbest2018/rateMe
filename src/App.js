import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import Header from "./components/Header";
import Rating from "./components/Rating";
import RateForm from "./components/RateForm";
import { RatingContext } from "./context/RatingContext";
import { RatingData } from "./data/RatingData";

function App() {
  const [ratings, setRatings] = useState(RatingData);
  const [edited, setEdited] = useState({ rating: {}, isEdited: false });
  // TODO: delete
  console.log(ratings);

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

  const editRating = (rating) => {
    setEdited({
      rating,
      isEdited: true,
    });
  };

  const updateRating = (id, rating) => {
    setRatings((prevRatings) => {
      return prevRatings.map((prevRating) => {
        if (prevRating.id === id) {
          prevRating = { id, ...rating };
        }
        return prevRating;
      });
    });
  };

  return (
    <RatingContext.Provider
      value={{ ratings, edited, editRating, updateRating }}
    >
      <Header />
      <div className="container">
        <RateForm addRatings={addRatings} />
        <div className="ratings-stats">
          <h4>{ratings.length} Reviews</h4>
          <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
        <AnimatePresence>
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <motion.div
                key={rating.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Rating rating={rating} handleDelete={deleteRating} />
              </motion.div>
            ))
          ) : (
            <p>No ratings yet</p>
          )}
        </AnimatePresence>
      </div>
    </RatingContext.Provider>
  );
}

export default App;

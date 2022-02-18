import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

import Header from "./components/Header";
import Rating from "./components/Rating";
import RateForm from "./components/RateForm";
import { RatingContext } from "./context/RatingContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const [edited, setEdited] = useState({ rating: {}, isEdited: false });

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const response = await fetch("/ratings?_sort=id&_order=desc");
    const data = await response.json();

    setRatings(data);
    setIsLoading(false);
  };

  let average =
    ratings.reduce((acc, cur) => {
      return acc + cur.score;
    }, 0) / ratings.length;

  average = average.toFixed(1).replace(/[.,]0$/, "");

  const deleteRating = async (id) => {
    if (window.confirm("Are you sure you want to delete? ")) {
      await fetch(`/ratings/${id}`, { method: "DELETE" });
      setRatings(ratings.filter((rating) => rating.id !== id));
    }
  };

  const addRatings = async (newRatings) => {
    const response = await fetch("/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRatings),
    });

    const data = await response.json();

    setRatings((prevRatings) => [data, ...prevRatings]);
  };

  const editRating = (rating) => {
    setEdited({
      rating,
      isEdited: true,
    });
  };

  const updateRating = async (id, rating) => {
    const response = await fetch(`/ratings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rating),
    });

    const data = await response.json();

    setRatings((prevRatings) => {
      return prevRatings.map((prevRating) => {
        if (prevRating.id === id) {
          prevRating = data;
        }
        return prevRating;
      });
    });
  };

  return (
    <RatingContext.Provider
      value={{
        ratings,
        edited,
        isLoading,
        editRating,
        updateRating,
      }}
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

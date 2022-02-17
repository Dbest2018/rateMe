import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Rating from "./components/Rating";
import { RatingData } from "./data/RatingData";

function App() {
  const [ratings, setRatings] = useState(RatingData);

  const deleteRating = (id) => {
    if (window.confirm("Are you sure you want to delete? ")) {
      setRatings(ratings.filter((rating) => rating.id !== id));
    }
  };
  return (
    <div className="app">
      <Header />
      {ratings ? (
        ratings.map((rating) => (
          <Rating rating={rating} key={rating.id} handleDelete={deleteRating} />
        ))
      ) : (
        <p>No ratings yet</p>
      )}
    </div>
  );
}

export default App;

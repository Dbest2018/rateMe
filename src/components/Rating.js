import React from "react";
import { FaTimes } from "react-icons/fa";

const Rating = ({ rating, handleDelete }) => {
  const { id, score, text } = rating;
  return (
    <div className="card">
      <div className="num-display">{score}</div>
      <button className="close" onClick={() => handleDelete(id)}>
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{text}</div>
    </div>
  );
};

export default Rating;

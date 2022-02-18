import React, { useContext } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { RatingContext } from "../context/RatingContext";

const Rating = ({ rating, handleDelete }) => {
  const { id, score, text } = rating;
  const { editRating } = useContext(RatingContext);
  return (
    <div className="card">
      <div className="num-display">{score}</div>
      <button className="close" onClick={() => handleDelete(id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editRating(rating)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{text}</div>
    </div>
  );
};

export default Rating;

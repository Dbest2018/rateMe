import React, { useState, useContext, useEffect } from "react";
import RateScore from "./RateScore";
import { RatingContext } from "../context/RatingContext";

const RateForm = ({ addRatings }) => {
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(10);

  const { edited, updateRating } = useContext(RatingContext);

  useEffect(() => {
    if (edited.isEdited) {
      setBtnDisabled(false);
      setText(edited.rating.text);
      setRating(edited.rating.score);
    }
  }, [edited]);

  const handleChange = (e) => {
    if (text === "") {
      setMessage("");
      setBtnDisabled(true);
    } else if (text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "" && text.trim().length > 10) {
      const newRatings = {
        text,
        score: rating,
      };
      if (edited.isEdited) {
        updateRating(edited.rating.id, newRatings);
      } else {
        addRatings(newRatings);
      }
    }
    setText("");
  };
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2>How would you rate this product</h2>
        <RateScore setRateScore={setRating} />
        <div className="input-group">
          <input
            value={text}
            name="text"
            placeholder="Write a review"
            onChange={handleChange}
          />
          <button className={`btn btn-primary`} disabled={btnDisabled}>
            send
          </button>
        </div>
      </form>
      <div className="message">{message}</div>
    </div>
  );
};

export default RateForm;

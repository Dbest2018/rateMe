import React, { useState } from "react";

const RateForm = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="card">
      <form>
        <h2>How would you rate this product</h2>
        <div className="input-group">
          <input
            value={text}
            name="text"
            placeholder="Write a review"
            onChange={handleChange}
          />
          <button className={`btn btn-primary`}>send</button>
        </div>
      </form>
    </div>
  );
};

export default RateForm;

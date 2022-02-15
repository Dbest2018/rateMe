import React from "react";
import PropTypes from "prop-types";

const Header = ({ text, bg, textColor }) => {
  const headerStyles = {
    backgroundColor: bg,
    textColor: textColor,
  };
  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
};

export default Header;

Header.defaultProps = {
  text: "Rate Me",
  bg: "rgba(0, 0, 0, .4)",
  textColor: "#ff6a95",
};

Header.propTypes = {
  text: PropTypes.string,
  bg: PropTypes.string,
  textColor: PropTypes.string,
};

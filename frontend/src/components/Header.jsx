import React from "react";

const Header = () => {
  return (
    <section className="h-wrapper">
        <div className="h-container">
          <img src="./logo.png" alt="logo" width={100} />
          <div className="h-menu">
            <a href=""> Residencies</a>
            <a href=""> Our Core values</a>
            <a href=""> Contact Us</a>
            <a href="">Get Started</a>
            <button className="button">
              <a href="">contact</a>
            </button>
          </div>
        </div>
      </section>
  )
};

export default Header;

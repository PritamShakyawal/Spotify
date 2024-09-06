import React from "react";
import { Link } from "react-router-dom";
import "../CSS/PremiumPage.css";

const PremiumPage = () => {
    return (
      <div className="premium-page">
        <header className="premium-header">
          <h1>Spotify Premium</h1>
          <p>Enjoy ad-free music, offline listening, and more.</p>
        </header>
        <section className="premium-content">
          <div className="premium-offers">
            <h2>Choose Your Plan</h2>
            <div className="plan">
              <h3>Individual</h3>
              <p>$9.99/month</p>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
            <div className="plan">
              <h3>Individual</h3>
              <p>$9.99/month</p>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </div>
          </div>
        </section>
        <footer className="premium-footer">
          <p>&copy; 2024 Spotify</p>
        </footer>
      </div>
    );
  };
  

export default PremiumPage;

import React from 'react';
import './PreorderCard.css';
import thaliImage from '../assets/thali.jpg';

const PreorderCard = () => {
  return (
    <section id="preorder-meals" className="preorder-card-section section-fade">
      <div className="container">
        <div className="preorder-card">
          <div className="card-image">
            <img src={thaliImage} alt="Delicious Meal" loading="lazy" />
          </div>
          <div className="card-content">
            <div className="section-title">
              <h2>Pre-order a Meal</h2>
              <p>Want to see if you like our taste? Order now from our lunch and dinner menu and get free delivery.</p>
            </div>

            <div className="preorder-meal-options">
              <div className="meal-option">
                <h4>Meal</h4>
                <span className="price">₹100</span>
                <p>Homely, nutritious, and flavorful.</p>
              </div>
              <div className="meal-option">
                <h4>Super Meal</h4>
                <span className="price">₹130</span>
                <p>Wholesome, protein-rich, and delicious.</p>
              </div>
            </div>

            <div className="preorder-details">
              <h3>Why Pre-Order?</h3>
              <p>We source fresh ingredients daily based on pre-orders. No excess, no wastage-just quality food.</p>

              <h3>How It Works</h3>
              <ol>
                <li>Check out our daily menu.</li>
                <li>Book a meal in advance, and we'll cook it fresh for you.</li>
                <li>We'll deliver it to your place.</li>
              </ol>
              <p className="timings"><em>Timings: Lunch (12-2 PM), Dinner (7-9 PM)</em></p>
              <p className="service-area"><strong>We serve the Chennai South (OMR, Velachery, Taramani, Shollinganallur, Pallikaranai)</strong></p>

              <a 
                href="https://wa.me/+917418688269?text=I'm%20interested%20in%20your%20plan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn trial-btn"
              >
                Request a trial meal!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreorderCard; 
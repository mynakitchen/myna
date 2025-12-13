import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import './ProblemStatement.css';

const scrollToPlans = () => {
  const section = document.getElementById('subscription-plans');
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

const SingleMealHighlight = () => {
  return (
    <section className="single-meal-highlight">
      <div className="container mx-auto px-6 py-16">
        <div className="single-meal-card">
          <div className="single-meal-icon" aria-hidden="true">
            <FontAwesomeIcon icon={faBoxOpen} size="2x" />
          </div>
          <span className="single-meal-badge">Pay Only When You Order</span>
          <h2 className="single-meal-title">Order Single Meals Without a Subscription</h2>
          <p className="single-meal-description">
            Keep things flexible. Grab a homely lunch or dinner on the days you need us,
            no commitments, no minimum balance, and no advance planning required.
          </p>
          <ul className="single-meal-points">
            <li>Pick from the day&apos;s South & North Indian specials.</li>
            <li>Secure checkout with instant order confirmation.</li>
            <li>Perfect for busy schedules, travel days, or spontaneous plans.</li>
          </ul>
          <div className="single-meal-actions">
            <button type="button" className="single-meal-button" onClick={scrollToPlans}>
              Explore Meals & Pricing
            </button>
            <p className="single-meal-note">
              Want daily flexibility? Start with a single meal and upgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMealHighlight;


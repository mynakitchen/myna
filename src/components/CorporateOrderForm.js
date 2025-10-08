import React, { useState } from 'react';
import './CorporateOrderForm.css';

const CorporateOrderForm = ({ showHeader = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    company_name: '',
    location: '',
    type: '',
    no_of_orders: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Import Supabase client dynamically
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js");
      
      // Replace with your actual Supabase credentials
      const supabase = createClient(
        "https://yqymdsmhxsijlmrvlczo.supabase.co", 
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxeW1kc21oeHNpamxtcnZsY3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NzE4MzksImV4cCI6MjA2NjQ0NzgzOX0.5fHhlKLhOVdjPgmXYxTTz7PbyqpXsD1SGDsH-ZkSF6k"
      );

      const { error } = await supabase.schema("myna")
        .from("bulk_order_enquries")
        .insert([formData]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone_number: '',
        email: '',
        company_name: '',
        location: '',
        type: '',
        no_of_orders: '',
        notes: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="corporate-form-page">
      {showHeader && (
        <div className="form-header">
          <div className="container">
            <button className="back-button" onClick={handleBackToHome}>
              ← Back to Home
            </button>
            <h1 className="form-title">Corporate & Bulk Orders</h1>
            <p className="form-subtitle">
              Let us know your requirements and we'll create a customized meal solution for your team
            </p>
          </div>
        </div>
      )}

      <div className="form-container">
        <div className="container">
          <div className="form-wrapper">
            <div className="form-content">
              <div className="form-intro">
                <h2>Get Your Custom Quote</h2>
                <p>Fill out the form below and our team will get back to you within 24 hours with a tailored proposal.</p>
              </div>

              <form id="corpForm" onSubmit={handleSubmit} className="corporate-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company_name">Company Name *</label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="location">Location/Address *</label>
                    <textarea
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your office address or event location"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="type">Type of Partnership *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select partnership type</option>
                      <option value="bulk_subscription_plan">Bulk Subscription Plan</option>
                      <option value="one_time_meal_order">One Time Meal Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="no_of_orders">Estimated Head Count *</label>
                    <select
                      id="no_of_orders"
                      name="no_of_orders"
                      value={formData.no_of_orders}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select head count</option>
                      <option value="5-25">5-25 people</option>
                      <option value="25-50">25-50 people</option>
                      <option value="50-100">50-100 people</option>
                      <option value="100-500">100-500 people</option>
                      <option value="500+">500+ people</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements, dietary preferences, budget range, or other details..."
                      rows="4"
                    ></textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>

              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  <div className="alert-icon">✅</div>
                  <div>
                    <h3>Request Submitted Successfully!</h3>
                    <p>Thank you for your interest. Our team will contact you within 24 hours with a customized proposal.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-error">
                  <div className="alert-icon">❌</div>
                  <div>
                    <h3>Something went wrong</h3>
                    <p>Please try again or contact us directly at corporate@myna.com</p>
                  </div>
                </div>
              )}
            </div>

            <div className="additional-info-section">
              <div className="section-title-wrapper">
                <h2 className="bottom-section-title">Additional Information</h2>
                <p className="bottom-section-subtitle">Get help or learn more about our corporate solutions</p>
              </div>
              
              <div className="form-sidebar">
                <div className="contact-info">
                  <h3>Need Help?</h3>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <strong>Call us</strong>
                    <p>+91 7418688269</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email us</strong>
                    <p>admin@mynakitchen.in</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">⏰</span>
                  <div>
                    <strong>Response time</strong>
                    <p>Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="benefits-list">
                <h3>What You Get</h3>
                <ul>
                  <li>✨ Customized meal plans</li>
                  <li>💰 Competitive bulk pricing</li>
                  <li>🚚 Reliable daily delivery</li>
                  <li>🍱 Fresh, healthy meals</li>
                  <li>📊 Monthly reporting</li>
                  <li>🎯 Dedicated account manager</li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateOrderForm;
import React from 'react';
import './CorporateOrders.css';

const CorporateOrders = () => {
  const handleCorporateOrderClick = () => {
    if (window.location.pathname === '/corporate-orders') {
      const formEl = document.getElementById('corpForm');
      if (formEl) {
        const y = formEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
    window.history.pushState(null, '', '/corporate-orders');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="corporate-orders" className="section-fade corporate-orders-section">
      <div className="corp-hero">
        <div className="corp-hero-body">
          <p className="corp-pill">Myna for Teams</p>
          <h1>Corporate Meal Programs That Energize Every Workday</h1>
          <p className="corp-hero-copy">
            Unlock chef-crafted menus, reliable delivery, and wellness-driven meal plans tailored for your
            teams, events, and partners across Chennai. One dashboard, endless flexibility.
          </p>
          <div className="corp-hero-cta">
            <button className="corp-primary-btn" onClick={handleCorporateOrderClick}>
              Build Your Corporate Plan
            </button>
            <button
              className="corp-secondary-btn"
              type="button"
              onClick={handleCorporateOrderClick}
            >
              Talk to Our Food Consultants
            </button>
          </div>
          <div className="corp-logos">
            <span>Trusted by teams at</span>
            <div className="corp-logo-row">
              <div className="corp-logo-placeholder" aria-hidden="true">5k Car Care</div>
              <div className="corp-logo-placeholder" aria-hidden="true">Amura Health</div>
              <div className="corp-logo-placeholder" aria-hidden="true">Truvanta</div>
            </div>
          </div>
        </div>
      </div>

      <div className="corp-container">
        <div className="corp-nav" role="navigation" aria-label="Corporate meals sections">
          <a className="corp-nav-item" href="#corp-benefits">
            Benefits
          </a>
          <a className="corp-nav-item" href="#corp-solutions">
            Solutions
          </a>
          <a className="corp-nav-item" href="#corp-programs">
            Meal Programs
          </a>
          <a className="corp-nav-item" href="#corp-steps">
            How It Works
          </a>
          <a className="corp-nav-item" href="#corp-testimonials">
            Success Stories
          </a>
        </div>

        <section id="corp-benefits" className="corp-section">
          <div className="corp-section-head">
            <span className="corp-kicker">Why Teams Pick Myna</span>
            <h2>Built for HR, loved by employees, powered by chefs</h2>
            <p>
              From daily refuelling to festive feasts, we make workplace dining feel effortless. Reduce the
              back-and-forth with vendors, serve impressive meals, and keep your people engaged.
            </p>
          </div>
          <div className="corp-grid corp-benefit-grid">
            <article className="corp-card">
              <h3>On-demand or scheduled</h3>
              <p>
                Power everything from weekly stand-ups to quarterly offsites. Switch between recurring and
                one-off deliveries without extra contracts.
              </p>
            </article>
            <article className="corp-card">
              <h3>Nutrition-first menus</h3>
              <p>
                Balanced, regional, and seasonal menus designed with nutritionists so every team member finds
                something they love.
              </p>
            </article>
            <article className="corp-card">
              <h3>Centralized billing</h3>
              <p>
                Consolidate invoices, track spend per team, and run approvals from a single dashboard built
                for corporate procurement.
              </p>
            </article>
            <article className="corp-card">
              <h3>Pan-city coverage</h3>
              <p>
                Delivering across Chennai’s tech parks, co-working hubs, and manufacturing zones with tight
                SLAs and dedicated support.
              </p>
            </article>
          </div>
        </section>

        <section id="corp-solutions" className="corp-section corp-split">
          <div className="corp-image-placeholder" aria-hidden="true" />
          <div className="corp-split-body">
            <span className="corp-kicker">Tailored Programs</span>
            <h2>Solutions that scale with your workforce</h2>
            <ul className="corp-list">
              <li>
                <strong>Corporate Meal Credits:</strong> Give managers the freedom to reward teams with
                reloadable meal wallets redeemable across menus.
              </li>
              <li>
                <strong>Bulk Event Catering:</strong> Curated spreads, live counters, and plated service for
                town halls, trainings, and celebrations.
              </li>
              <li>
                <strong>Pantry-as-a-Service:</strong> Stock your office pantries with rotating snacks,
                beverages, and immunity-boosting add-ons.
              </li>
            </ul>
          </div>
        </section>

        <section id="corp-programs" className="corp-section">
          <div className="corp-section-head">
            <span className="corp-kicker">Curated Meal Programs</span>
            <h2>Pick the format, we’ll perfect the experience</h2>
          </div>
          <div className="corp-programs-grid">
            <article className="corp-program-card">
              <h3>Daily Chef Rotation</h3>
              <p>
                Rotating Indian and global plates with vegetarian, vegan, and protein-rich options planned for
                productivity.
              </p>
              <ul>
                <li>Monday to Friday set menus</li>
                <li>Real-time headcount adjustments</li>
                <li>Desk delivery or cafeteria setup</li>
              </ul>
            </article>
            <article className="corp-program-card">
              <h3>Hybrid Workforce Packs</h3>
              <p>
                Meal kits and ready-to-heat combos shipped to remote teams so everyone feels included.
              </p>
              <ul>
                <li>Nationwide reach with cold-chain logistics</li>
                <li>Personalized welcome notes</li>
                <li>Optional wellness add-ons</li>
              </ul>
            </article>
            <article className="corp-program-card">
              <h3>Celebration & Festive Drops</h3>
              <p>
                Limited-edition menus for Diwali, Pongal, product launches, and milestone wins.
              </p>
              <ul>
                <li>Custom branding on packaging</li>
                <li>Live chef interactions</li>
                <li>Complementary dessert pairings</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="corp-steps" className="corp-section corp-split">
          <div className="corp-split-body">
            <span className="corp-kicker">Getting Started</span>
            <h2>Launch in days, delight for months</h2>
            <ol className="corp-steps">
              <li>
                <strong>Schedule a discovery call:</strong> Share your meal cadence, headcount, and dietary
                needs with our consultants.
              </li>
              <li>
                <strong>Design your program:</strong> We map menus, logistics, and SLAs, then share a fully
                costed proposal.
              </li>
              <li>
                <strong>Roll out with confidence:</strong> Dedicated success managers, live support, and
                feedback loops keep every meal on point.
              </li>
            </ol>
            <button className="corp-primary-btn" onClick={handleCorporateOrderClick}>
              Start Your Consultation
            </button>
          </div>
          <div className="corp-metrics">
            <div className="corp-metric-card">
              <span className="corp-metric-value">15k+</span>
              <span className="corp-metric-label">meals served daily</span>
            </div>
            <div className="corp-metric-card">
              <span className="corp-metric-value">98%</span>
              <span className="corp-metric-label">corporate retention</span>
            </div>
            <div className="corp-metric-card">
              <span className="corp-metric-value">30+</span>
              <span className="corp-metric-label">enterprise kitchens</span>
            </div>
          </div>
        </section>

        <section id="corp-testimonials" className="corp-section">
          <div className="corp-section-head">
            <span className="corp-kicker">Success Stories</span>
            <h2>How teams fuel performance with Myna</h2>
          </div>
          <div className="corp-testimonial-grid">
            <figure className="corp-testimonial-card">
              <blockquote>
                “Our employees look forward to lunch every day. The variety, punctual deliveries, and
                effortless coordination give us back valuable time.”
              </blockquote>
              <figcaption>
                <strong>Ananya Rao</strong>
                <span>HR Business Partner, Fintech Unicorn</span>
              </figcaption>
            </figure>
            <figure className="corp-testimonial-card">
              <blockquote>
                “Their festive menus and live counters made our annual offsite a runaway hit. We now partner
                with Myna for every major event.”
              </blockquote>
              <figcaption>
                <strong>Vikram Sinha</strong>
                <span>Head of Workplace, SaaS Scaleup</span>
              </figcaption>
            </figure>
            <figure className="corp-testimonial-card">
              <blockquote>
                “Billing and approvals used to take days. With Myna’s dashboard, finance clears everything in
                hours. We’ve never had more visibility.”
              </blockquote>
              <figcaption>
                <strong>Neha Joseph</strong>
                <span>Procurement Lead, Manufacturing Major</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="corp-cta-banner">
          <div className="corp-cta-content">
            <h2>Ready to reimagine workplace dining?</h2>
            <p>Tell us about your team and we’ll craft a tasting menu within 24 hours.</p>
          </div>
          <button className="corp-primary-btn" onClick={handleCorporateOrderClick}>
            Plan a tasting
          </button>
        </section>
      </div>
    </section>
  );
};

export default CorporateOrders;
import React from 'react';

const TrialCallToAction = () => {
  const handleTrialClick = () => {
    window.open('https://app.mynakitchen.in/signup', '_blank');
  };

  return (
    <section className="bg-primary py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white mix-blend-overlay blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-accent mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              Not sure yet? <br className="hidden md:block" />
              <span className="text-accent">Taste the difference</span> in 3 days.
            </h2>
            <p className="text-brown-100 text-lg md:text-xl max-w-xl mx-auto md:mx-0 font-medium opacity-90">
              Experience our premium quality, timely delivery, and homely taste without a long commitment. 
              If we're not a match, simply stop. No questions asked.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6 text-sm text-brown-200 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>No Commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>

          {/* CTA Button Area */}
          <div className="flex-shrink-0 w-full md:w-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <button
                onClick={handleTrialClick}
                className="w-full md:w-auto px-8 py-4 bg-accent hover:bg-white hover:text-accent text-white text-lg md:text-xl font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group"
              >
                Start 3-Day Trial
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </button>
              <p className="text-center text-brown-200 text-sm mt-3">
                Starting at just <span className="text-white font-bold">₹240</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrialCallToAction;


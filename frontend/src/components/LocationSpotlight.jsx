import React from 'react';

const LocationSpotlight = () => {
  return (
    <section className="location-spotlight">
      <div className="spotlight-content">
        <div className="floating-images">
          <div className="float-img float-img-1">
            <img src="https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=300&q=80" alt="Decorative" />
          </div>
          <div className="float-img float-img-2">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80" alt="Decorative" />
          </div>
        </div>

        <div className="spotlight-text">
          <span className="spotlight-label">LOCATION SPOTLIGHT</span>
          <h2 className="spotlight-title">Nantucket, Massachusetts</h2>
          <p className="spotlight-subtitle">Where summers feel endless.</p>
          <a href="#nantucket" className="spotlight-button">
            View the edit
          </a>
        </div>
      </div>

      <div className="spotlight-background">
        <img 
          src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=1600&q=80" 
          alt="Nantucket hydrangeas"
        />
        <div className="spotlight-overlay"></div>
      </div>
    </section>
  );
};

export default LocationSpotlight;
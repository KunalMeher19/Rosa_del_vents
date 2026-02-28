import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

const hotelsData = [
  {
    id: 1,
    name: 'CASA DE SIERRA NEVADA, A BELMOND HOTEL',
    location: 'San Miguel de Allende',
    price: 'FROM $475/NIGHT',
    rooms: '37 ROOMS',
    airport: 'GUANAJUATO INTERNATIONAL AIRPORT',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80'
  },
  {
    id: 2,
    name: 'MOLLIE ASPEN',
    location: 'Aspen, Colorado',
    price: 'FROM $500/NIGHT',
    rooms: '68 ROOMS',
    airport: 'ASPEN/PITKIN COUNTY AIRPORT',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=200&q=80'
  },
  {
    id: 3,
    name: 'CASA SILENCIO',
    location: 'Oaxaca, Mexico',
    price: 'FROM $1,415/NIGHT',
    rooms: '6 ROOMS',
    airport: 'XOXOCOTLAN INTERNATIONAL AIRPORT (OAX/MMOX)',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80'
  },
  {
    id: 4,
    name: 'LA VALISE TULUM',
    location: 'Tulum, Mexico',
    price: 'FROM $705/NIGHT',
    rooms: '22 ROOMS',
    airport: 'CANCUN INTERNATIONAL AIRPORT (CUN)',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80'
  },
  {
    id: 5,
    name: 'VILLA MARA CARMEL',
    location: 'Carmel Point, Carmel-By-The-Sea',
    price: 'FROM $444/NIGHT',
    rooms: '16 ROOMS',
    airport: 'MONTEREY REGIONAL AIRPORT',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&q=80'
  },
  {
    id: 6,
    name: 'MAISON SAINT VINCENT',
    location: 'Montreal, Canada',
    price: 'FROM $165/NIGHT',
    rooms: '10 ROOMS',
    airport: 'MONTREAL-TRUDEAU INTERNATIONAL',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&q=80'
  }
];

const HotelsSection = () => {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.hotels-section .section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Table rows stagger animation
      gsap.from('.table-row', {
        scrollTrigger: {
          trigger: '.hotels-table',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle hover image animation
  const handleMouseEnter = (id, e) => {
    setHoveredId(id);

    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);

      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          x: e.clientX - 100,
          y: e.clientY - 75
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        }
      );
    }
  };

  const handleMouseMove = (e) => {
    if (imageRef.current && hoveredId) {
      gsap.to(imageRef.current, {
        x: e.clientX - 100,
        y: e.clientY - 75,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  };

  const hoveredHotel = hotelsData.find(h => h.id === hoveredId);

  return (
    <section id="hotels" className="hotels-section reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">
          Hotels<sup>({hotelsData.length.toString().padStart(2, '0')})</sup>
        </h2>
        <a href="#all-hotels" className="explore-button magnetic">
          Explore hotels
        </a>
      </div>

      <div className="hotels-table">
        <div className="table-header">
          <span className="col-name">NAME</span>
          <span className="col-location">LOCATION</span>
          <span className="col-facts">FAST FACTS</span>
        </div>

        {hotelsData.map((hotel) => (
          <div
            key={hotel.id}
            className="table-row"
            onMouseEnter={(e) => handleMouseEnter(hotel.id, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="col-name">
              <span className="hotel-name">{hotel.name}</span>
            </div>
            <div className="col-location">
              {hotel.location}
            </div>
            <div className="col-facts">
              <span className="fact-tag">{hotel.price}</span>
              <span className="fact-tag">{hotel.rooms}</span>
              <span className="fact-tag">{hotel.airport}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating hover image */}
      <div
        ref={imageRef}
        className="floating-preview"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: 0,
          width: '200px',
          height: '150px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
      >
        {hoveredHotel && (
          <img
            src={hoveredHotel.image}
            alt={hoveredHotel.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default HotelsSection;
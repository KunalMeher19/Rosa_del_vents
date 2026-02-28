import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const amenitiesData = [
  {
    id: 1,
    nameEs: 'Habitación Doble',
    nameEn: 'Double Room',
    capacityEs: '2 personas',
    capacityEn: '2 people',
    featuresEs: ['BAÑO PRIVADO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['PRIVATE BATHROOM', 'AIR CONDITIONING', 'WIFI'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80'
  },
  {
    id: 2,
    nameEs: 'Habitación Individual',
    nameEn: 'Single Room',
    capacityEs: '1 persona',
    capacityEn: '1 person',
    featuresEs: ['BAÑO COMPARTIDO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['SHARED BATHROOM', 'AIR CONDITIONING', 'WIFI'],
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&q=80'
  },
  {
    id: 3,
    nameEs: 'Habitación Triple',
    nameEn: 'Triple Room',
    capacityEs: '3 personas',
    capacityEn: '3 people',
    featuresEs: ['BAÑO PRIVADO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['PRIVATE BATHROOM', 'AIR CONDITIONING', 'WIFI'],
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200&q=80'
  },
  {
    id: 4,
    nameEs: 'Habitación Familiar',
    nameEn: 'Family Room',
    capacityEs: '4 personas',
    capacityEn: '4 people',
    featuresEs: ['BAÑO PRIVADO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['PRIVATE BATHROOM', 'AIR CONDITIONING', 'WIFI'],
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=200&q=80'
  },
  {
    id: 5,
    nameEs: 'Habitación con Terraza',
    nameEn: 'Room with Terrace',
    capacityEs: '2 personas',
    capacityEn: '2 people',
    featuresEs: ['TERRAZA PRIVADA', 'BAÑO PRIVADO', 'WIFI'],
    featuresEn: ['PRIVATE TERRACE', 'PRIVATE BATHROOM', 'WIFI'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&q=80'
  }
];

const HotelsSection = () => {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const imageRef = useRef(null);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hotels-section .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
      gsap.from('.table-row', {
        scrollTrigger: { trigger: '.hotels-table', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (id, e) => {
    setHoveredId(id);
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, x: e.clientX - 100, y: e.clientY - 75 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  const handleMouseMove = (e) => {
    if (imageRef.current && hoveredId) {
      gsap.to(imageRef.current, { x: e.clientX - 100, y: e.clientY - 75, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0, scale: 0.8, duration: 0.2, ease: 'power2.in' });
    }
  };

  const hoveredRoom = amenitiesData.find(r => r.id === hoveredId);

  return (
    <section className="hotels-section reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">
          {t.amenities_title}<sup>({amenitiesData.length.toString().padStart(2, '0')})</sup>
        </h2>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="explore-button magnetic">
          {t.amenities_explore}
        </a>
      </div>

      <div className="hotels-table">
        <div className="table-header">
          <span className="col-name">{t.amenities_col1}</span>
          <span className="col-location">{t.amenities_col2}</span>
          <span className="col-facts">{t.amenities_col3}</span>
        </div>

        {amenitiesData.map((room) => (
          <div
            key={room.id}
            className="table-row"
            onMouseEnter={(e) => handleMouseEnter(room.id, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="col-name">
              <span className="hotel-name">{lang === 'es' ? room.nameEs : room.nameEn}</span>
            </div>
            <div className="col-location">
              {lang === 'es' ? room.capacityEs : room.capacityEn}
            </div>
            <div className="col-facts">
              {(lang === 'es' ? room.featuresEs : room.featuresEn).map((f, i) => (
                <span key={i} className="fact-tag">{f}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hover preview image */}
      <div ref={imageRef} className="floating-preview" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 100, opacity: 0, width: '200px', height: '150px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        {hoveredRoom && <img src={hoveredRoom.image} alt={hoveredRoom.nameEs} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
    </section>
  );
};

export default HotelsSection;
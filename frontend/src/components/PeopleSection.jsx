import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const aboutData = [
  {
    id: 1,
    nameEs: 'El Hostal',
    nameEn: 'The Hostel',
    descEs: 'Small family hostel in the centre of El Perelló',
    descEn: 'Small family hostel in the centre of El Perelló',
    infoEs: ['5 HABITACIONES', 'FAMILIAR', 'CENTRO'],
    infoEn: ['5 ROOMS', 'FAMILY', 'CENTRE'],
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=200&q=80'
  },
  {
    id: 2,
    nameEs: 'Ubicación',
    nameEn: 'Location',
    descEs: 'Carrer Sant Joan, 3 · El Perelló · Tarragona',
    descEn: 'Carrer Sant Joan, 3 · El Perelló · Tarragona',
    infoEs: ['COSTA DAURADA', 'TARRAGONA', 'ESPAÑA'],
    infoEn: ['COSTA DAURADA', 'TARRAGONA', 'SPAIN'],
    image: 'https://images.unsplash.com/photo-1566218246241-934ae4d9e40a?w=200&q=80'
  },
  {
    id: 3,
    nameEs: 'Reservas',
    nameEn: 'Bookings',
    descEs: 'Booking.com · Contacto directo',
    descEn: 'Booking.com · Direct contact',
    infoEs: ['DISPONIBLE', 'ONLINE', 'DIRECTO'],
    infoEn: ['AVAILABLE', 'ONLINE', 'DIRECT'],
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=200&q=80'
  },
];

const PeopleSection = () => {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const imageRef = useRef(null);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.people-section .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
      gsap.from('.people-section .table-row', {
        scrollTrigger: { trigger: '.people-table', start: 'top 85%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (id, e) => {
    setHoveredId(id);
    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);
      gsap.fromTo(imageRef.current, { opacity: 0, scale: 0.7, rotation: -5 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.7)' });
      gsap.set(imageRef.current, { x: e.clientX - 75, y: e.clientY - 100 });
    }
  };

  const handleMouseMove = (e) => {
    if (imageRef.current && hoveredId) {
      gsap.to(imageRef.current, { x: e.clientX - 75, y: e.clientY - 100, duration: 0.5, ease: 'power3.out' });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0, scale: 0.7, rotation: 5, duration: 0.3, ease: 'power2.in' });
    }
  };

  const hoveredItem = aboutData.find(a => a.id === hoveredId);

  return (
    <section id="nosotros" className="people-section reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title light">{t.about_title}<sup>({aboutData.length.toString().padStart(2, '0')})</sup></h2>
        <a href="#contacto" className="explore-button light magnetic-light">{t.about_explore}</a>
      </div>

      <div className="people-table">
        <div className="table-header dark">
          <span className="col-name">{t.about_col1}</span>
          <span className="col-location">{t.about_col2}</span>
          <span className="col-occupation">{t.about_col3}</span>
        </div>

        {aboutData.map((item) => (
          <div
            key={item.id}
            className="table-row dark"
            onMouseEnter={(e) => handleMouseEnter(item.id, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="col-name">
              <span className="person-name">{lang === 'es' ? item.nameEs : item.nameEn}</span>
            </div>
            <div className="col-location">{lang === 'es' ? item.descEs : item.descEn}</div>
            <div className="col-occupation">
              {(lang === 'es' ? item.infoEs : item.infoEn).map((tag, idx) => (
                <span key={idx} className="occupation-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hover image */}
      <div ref={imageRef} className="floating-preview-person" style={{ position: 'fixed', pointerEvents: 'none', zIndex: 100, opacity: 0, width: '150px', height: '200px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
        {hoveredItem && <img src={hoveredItem.image} alt={hoveredItem.nameEs} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
    </section>
  );
};

export default PeopleSection;
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import './HotelsSection.css';

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
  },
  {
    id: 2,
    nameEs: 'Habitación Individual',
    nameEn: 'Single Room',
    capacityEs: '1 persona',
    capacityEn: '1 person',
    featuresEs: ['BAÑO COMPARTIDO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['SHARED BATHROOM', 'AIR CONDITIONING', 'WIFI'],
  },
  {
    id: 3,
    nameEs: 'Habitación Triple',
    nameEn: 'Triple Room',
    capacityEs: '3 personas',
    capacityEn: '3 people',
    featuresEs: ['BAÑO PRIVADO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['PRIVATE BATHROOM', 'AIR CONDITIONING', 'WIFI'],
  },
  {
    id: 4,
    nameEs: 'Habitación Familiar',
    nameEn: 'Family Room',
    capacityEs: '4 personas',
    capacityEn: '4 people',
    featuresEs: ['BAÑO PRIVADO', 'AIRE ACONDICIONADO', 'WIFI'],
    featuresEn: ['PRIVATE BATHROOM', 'AIR CONDITIONING', 'WIFI'],
  },
  {
    id: 5,
    nameEs: 'Habitación con Terraza',
    nameEn: 'Room with Terrace',
    capacityEs: '2 personas',
    capacityEn: '2 people',
    featuresEs: ['TERRAZA PRIVADA', 'BAÑO PRIVADO', 'WIFI'],
    featuresEn: ['PRIVATE TERRACE', 'PRIVATE BATHROOM', 'WIFI'],
  }
];

const HotelsSection = () => {
  const sectionRef = useRef(null);
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
          <a
            key={room.id}
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="table-row"
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default HotelsSection;
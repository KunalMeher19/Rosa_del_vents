import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import './HotelsSection.css';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const amenitiesData = [
  {
    id: 1,
    nameEs: 'Habitación Triple Clásica',
    nameEn: 'Classic Triple Room',
    capacityEs: '3 personas',
    capacityEn: '3 people',
    featuresEs: ['1 SOFÁ CAMA + 1 CAMA QUEEN', 'BAÑO PRIVADO', 'WIFI'],
    featuresEn: ['1 SOFA BED + 1 QUEEN BED', 'PRIVATE BATHROOM', 'WIFI'],
  },
  {
    id: 2,
    nameEs: 'Habitación Doble con Terraza',
    nameEn: 'Double Room with Terrace',
    capacityEs: '2 personas',
    capacityEn: '2 people',
    featuresEs: ['1 CAMA DOBLE (FULL)', 'TERRAZA PRIVADA', 'WIFI'],
    featuresEn: ['1 FULL BED', 'PRIVATE TERRACE', 'WIFI'],
  },
  {
    id: 3,
    nameEs: 'Habitación Individual Estándar',
    nameEn: 'Standard Single Room',
    capacityEs: '1 persona',
    capacityEn: '1 person',
    featuresEs: ['1 CAMA INDIVIDUAL (TWIN)', 'BAÑO COMPARTIDO', 'WIFI'],
    featuresEn: ['1 TWIN BED', 'SHARED BATHROOM', 'WIFI'],
  },
  {
    id: 4,
    nameEs: 'Habitación Familiar con Baño',
    nameEn: 'Family Room with Bathroom',
    capacityEs: '3 personas',
    capacityEn: '3 people',
    featuresEs: ['1 CAMA TWIN + 1 CAMA QUEEN', 'BAÑO PRIVADO', 'WIFI'],
    featuresEn: ['1 TWIN BED + 1 QUEEN BED', 'PRIVATE BATHROOM', 'WIFI'],
  },
  {
    id: 5,
    nameEs: 'Habitación Individual Estándar',
    nameEn: 'Standard Single Room',
    capacityEs: '1 persona',
    capacityEn: '1 person',
    featuresEs: ['1 CAMA INDIVIDUAL (TWIN)', 'BAÑO COMPARTIDO', 'WIFI'],
    featuresEn: ['1 TWIN BED', 'SHARED BATHROOM', 'WIFI'],
  }
];

const HotelsSection = () => {
  const sectionRef = useRef(null);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hotels-section .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
      gsap.from('.table-row', {
        scrollTrigger: { trigger: '.hotels-table', start: 'top 80%', toggleActions: 'play none none none' },
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
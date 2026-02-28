import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useLang } from '../context/LanguageContext';

gsap.registerPlugin(Draggable);

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

// Placeholder room data — update with real photos and prices
const rooms = [
  {
    id: 1,
    nameEs: 'Habitación Doble',
    nameEn: 'Double Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    capacity: 2,
    priceEs: '60',
    priceEn: '60',
    flag: '🛏️'
  },
  {
    id: 2,
    nameEs: 'Habitación Individual',
    nameEn: 'Single Room',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80',
    capacity: 1,
    priceEs: '40',
    priceEn: '40',
    flag: '🛏️'
  },
  {
    id: 3,
    nameEs: 'Habitación Triple',
    nameEn: 'Triple Room',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
    capacity: 3,
    priceEs: '80',
    priceEn: '80',
    flag: '🛏️'
  },
  {
    id: 4,
    nameEs: 'Habitación Familiar',
    nameEn: 'Family Room',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
    capacity: 4,
    priceEs: '95',
    priceEn: '95',
    flag: '🏠'
  },
  {
    id: 5,
    nameEs: 'Habitación con Terraza',
    nameEn: 'Room with Terrace',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    capacity: 2,
    priceEs: '75',
    priceEn: '75',
    flag: '🌿'
  }
];

const allRooms = [...rooms, ...rooms];

const HotelCarousel = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf = requestAnimationFrame(() => {
      const singleSetWidth = track.scrollWidth / 2;

      autoScrollRef.current = gsap.fromTo(track,
        { x: 0 },
        {
          x: -singleSetWidth,
          duration: 35,
          ease: 'none',
          repeat: -1,
          repeatDelay: 0,
          onRepeat: () => gsap.set(track, { x: 0 }),
        }
      );

      Draggable.create(track, {
        type: 'x',
        inertia: false,
        onDragStart: () => {
          setIsDragging(true);
          if (autoScrollRef.current) autoScrollRef.current.pause();
        },
        onDragEnd: () => {
          setIsDragging(false);
          gsap.delayedCall(1.5, () => {
            if (autoScrollRef.current) autoScrollRef.current.play();
          });
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (autoScrollRef.current) autoScrollRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (autoScrollRef.current && !isDragging) gsap.to(autoScrollRef.current, { timeScale: 0.15, duration: 0.4 });
  };
  const handleMouseLeave = () => {
    if (autoScrollRef.current && !isDragging) gsap.to(autoScrollRef.current, { timeScale: 1, duration: 0.4 });
  };

  return (
    <section id="habitaciones" className="hotel-carousel-section">
      <div className="carousel-section-header">
        <div>
          <h2 className="section-title">{t.rooms_title}<sup>(0{rooms.length})</sup></h2>
          <p className="carousel-subtitle">{t.rooms_subtitle}</p>
        </div>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="explore-button magnetic">
          {t.rooms_explore}
        </a>
      </div>

      <div className="hotel-carousel" ref={wrapperRef}>
        <div className="carousel-track" ref={trackRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {allRooms.map((room, index) => (
            <div key={`${room.id}-${index}`} className="carousel-item">
              <div className="location-tag">
                <span className="flag">{room.flag}</span>
                <span>{room.capacity} {room.capacity === 1 ? (lang === 'es' ? 'persona' : 'person') : (lang === 'es' ? 'personas' : 'people')}</span>
              </div>
              <div className="image-wrapper">
                <img src={room.image} alt={lang === 'es' ? room.nameEs : room.nameEn} draggable="false" />
                <div className="image-overlay"></div>
              </div>
              <div className="hotel-info">
                <h3>{lang === 'es' ? room.nameEs : room.nameEn}</h3>
                <span className="price">{t.rooms_from} €{lang === 'es' ? room.priceEs : room.priceEn}{t.rooms_night}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelCarousel;
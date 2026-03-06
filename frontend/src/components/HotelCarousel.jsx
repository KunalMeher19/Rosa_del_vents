import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';
import { useLang } from '../context/LanguageContext';
import './HotelCarousel.css';

gsap.registerPlugin(Draggable, ScrollTrigger);

/* const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html'; */

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

const allRooms = [...rooms, ...rooms, ...rooms, ...rooms];

const HotelCarousel = () => {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const requestRef = useRef(null);
  const xPos = useRef(0);
  const direction = useRef(1); // 1 = right, -1 = left
  const velocity = useRef(1);
  const [isDragging, setIsDragging] = useState(false);
  const { t, lang } = useLang();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Small timeout ensures font/image layout has rendered so scrollWidth is accurate
    const initRAF = requestAnimationFrame(() => {
      const setWidth = track.scrollWidth / 4;
      const wrapX = gsap.utils.wrap(-setWidth * 2, -setWidth);

      xPos.current = -setWidth * 2;
      gsap.set(track, { x: xPos.current });

      const setX = gsap.quickSetter(track, "x", "px");

      let dragActive = false;

      const loop = () => {
        if (!dragActive) {
          xPos.current += (direction.current * velocity.current * 0.8);
          xPos.current = wrapX(xPos.current);
          setX(xPos.current);
        }
        requestRef.current = requestAnimationFrame(loop);
      };

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          // Scroll down moves to left side (-1), Scroll up moves right (1)
          direction.current = self.direction === 1 ? -1 : 1;
          velocity.current = 2.5; // 2.5x speed multiplier

          gsap.killTweensOf(velocity);
          gsap.to(velocity, {
            current: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              direction.current = 1; // back to normal rightward flow
            }
          });
        }
      });

      const drag = Draggable.create(track, {
        type: 'x',
        inertia: false,
        onPressInit: () => {
          dragActive = true;
          setIsDragging(true);
        },
        onDrag: function () {
          let newX = wrapX(this.x);
          if (newX !== this.x) {
            gsap.set(track, { x: newX });
            this.update();
            xPos.current = newX;
          } else {
            xPos.current = this.x;
          }
        },
        onRelease: function () {
          dragActive = false;
          setIsDragging(false);
          direction.current = this.deltaX > 0 ? 1 : -1;
          velocity.current = 2; // slight momentum boost post drag

          gsap.killTweensOf(velocity);
          gsap.to(velocity, {
            current: 1,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              direction.current = 1;
            }
          });
        }
      });

      requestRef.current = requestAnimationFrame(loop);

      track.__cleanup = () => {
        st.kill();
        drag[0].kill();
      };
    });

    return () => {
      cancelAnimationFrame(initRAF);
      cancelAnimationFrame(requestRef.current);
      if (track.__cleanup) track.__cleanup();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isDragging) {
      gsap.to(velocity, { current: 0.2, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      gsap.to(velocity, { current: 1, duration: 0.4 });
      direction.current = 1;
    }
  };

  return (
    <section id="habitaciones" className="hotel-carousel-section">

      {/* CSS gradient bridge — echoes hero colours, fades into this section */}
      <div className="carousel-fade-bridge" />

      <div className="carousel-section-header">
        {/* <div>
          <h2 className="section-title">{t.rooms_title}<sup>(0{rooms.length})</sup></h2>
          <p className="carousel-subtitle">{t.rooms_subtitle}</p>
        </div> */}
        {/* <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="explore-button magnetic">
          {t.rooms_explore}
        </a> */}
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
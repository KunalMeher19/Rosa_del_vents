import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const hotels = [
  {
    id: 1,
    name: 'Casa Silencio',
    location: 'Oaxaca, Mexico',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    price: 'From $1,415/night',
    flag: '🇲🇽'
  },
  {
    id: 2,
    name: 'Casa de Sierra Nevada, A Belmond Hotel',
    location: 'San Miguel de Allende',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    price: 'From $475/night',
    flag: '🇲🇽'
  },
  {
    id: 3,
    name: 'MOLLIE Aspen',
    location: 'Aspen, Colorado',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    price: 'From $500/night',
    flag: '🇺🇸'
  },
  {
    id: 4,
    name: 'La Valise Tulum',
    location: 'Tulum, Mexico',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    price: 'From $705/night',
    flag: '🇲🇽'
  },
  {
    id: 5,
    name: 'Villa Mara Carmel',
    location: 'Carmel-By-The-Sea',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    price: 'From $444/night',
    flag: '🇺🇸'
  }
];

const HotelCarousel = () => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoScrollRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Create infinite loop by cloning items
    const items = track.innerHTML;
    track.innerHTML = items + items;

    // Auto-scroll animation
    const startAutoScroll = () => {
      const totalWidth = track.scrollWidth / 2;

      autoScrollRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const newX = parseFloat(x) % totalWidth;
            return newX;
          })
        }
      });
    };

    // Start after delay
    const delay = gsap.delayedCall(2, startAutoScroll);

    // Draggable functionality
    const draggable = Draggable.create(track, {
      type: 'x',
      inertia: true,
      bounds: {
        minX: -(track.scrollWidth - track.parentElement.clientWidth),
        maxX: 0
      },
      onDragStart: () => {
        setIsDragging(true);
        if (autoScrollRef.current) {
          autoScrollRef.current.pause();
        }
      },
      onDragEnd: () => {
        setIsDragging(false);
        gsap.delayedCall(1, () => {
          if (autoScrollRef.current) {
            autoScrollRef.current.play();
          }
        });
      }
    })[0];

    // Entrance animation
    gsap.from('.carousel-item', {
      scrollTrigger: {
        trigger: track,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });

    return () => {
      delay.kill();
      if (autoScrollRef.current) autoScrollRef.current.kill();
      if (draggable) draggable.kill();
    };
  }, []);

  // Hover pause
  const handleMouseEnter = () => {
    if (autoScrollRef.current && !isDragging) {
      gsap.to(autoScrollRef.current, { timeScale: 0.2, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (autoScrollRef.current && !isDragging) {
      gsap.to(autoScrollRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div className="hotel-carousel">
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hotels.map((hotel, index) => (
          <div
            key={`${hotel.id}-${index}`}
            className="carousel-item"
          >
            <div className="location-tag">
              <span className="flag">{hotel.flag}</span>
              <span>{hotel.location}</span>
            </div>
            <div className="image-wrapper">
              <img src={hotel.image} alt={hotel.name} draggable="false" />
              <div className="image-overlay"></div>
            </div>
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <span className="price">{hotel.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelCarousel;
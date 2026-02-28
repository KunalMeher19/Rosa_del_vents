import React, { useRef, useEffect, useState } from 'react';

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
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPos = 0;
    const speed = 0.5;

    const autoScroll = () => {
      if (!isDragging) {
        scrollPos += speed;
        if (scrollPos >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollPos = 0;
        }
        scrollContainer.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scroll after a delay
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(autoScroll);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="hotel-carousel">
      <div 
        className="carousel-track"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {[...hotels, ...hotels].map((hotel, index) => (
          <div key={`${hotel.id}-${index}`} className="carousel-item">
            <div className="location-tag">
              <span className="flag">{hotel.flag}</span>
              <span>{hotel.location}</span>
            </div>
            <img src={hotel.image} alt={hotel.name} draggable="false" />
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
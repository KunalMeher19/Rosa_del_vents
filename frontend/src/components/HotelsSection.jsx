import React, { useState } from 'react';

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
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="hotels" className="hotels-section">
      <div className="section-header">
        <h2 className="section-title">
          Hotels<sup>(12)</sup>
        </h2>
        <a href="#all-hotels" className="explore-button">
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
            onMouseEnter={() => setHoveredId(hotel.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="col-name">
              <div className={`hover-image ${hoveredId === hotel.id ? 'visible' : ''}`}>
                <img src={hotel.image} alt={hotel.name} />
              </div>
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
    </section>
  );
};

export default HotelsSection;
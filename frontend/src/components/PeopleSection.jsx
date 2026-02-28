import React, { useState } from 'react';

const peopleData = [
  {
    id: 1,
    name: 'SIVAN ASKAYO',
    location: 'Tel Aviv, Israel',
    occupation: 'PHOTOGRAPHER',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
  },
  {
    id: 2,
    name: 'ENRICO COSTANTINI',
    location: 'Rome, Italy',
    occupation: 'PHOTOGRAPHER',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
  },
  {
    id: 3,
    name: 'MARGOT AND MASSIMILIANO PANSECA',
    location: 'Pantelleria, Sicily',
    occupation: 'OWNERS',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80'
  },
  {
    id: 4,
    name: 'MARIA FERNANDA RODRIGUEZ VELAZQUEZ',
    location: 'Oaxaca, Mexico',
    occupation: 'GENERAL MANAGER',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
  },
  {
    id: 5,
    name: 'BARBARA MIOUNI',
    location: 'Jaipur, India',
    occupation: 'FOUNDER',
    tags: ['OWNER'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80'
  },
  {
    id: 6,
    name: 'YVES NAMAN',
    location: 'Mexico City, Mexico',
    occupation: 'FOUNDER',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
  }
];

const PeopleSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="people" className="people-section">
      <div className="section-header">
        <h2 className="section-title light">
          People<sup>(17)</sup>
        </h2>
        <a href="#all-people" className="explore-button light">
          Explore people
        </a>
      </div>

      <div className="people-table">
        <div className="table-header dark">
          <span className="col-name">NAME</span>
          <span className="col-location">LOCATION</span>
          <span className="col-occupation">OCCUPATION</span>
        </div>

        {peopleData.map((person) => (
          <div 
            key={person.id}
            className="table-row dark"
            onMouseEnter={() => setHoveredId(person.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="col-name">
              <div className={`hover-image ${hoveredId === person.id ? 'visible' : ''}`}>
                <img src={person.image} alt={person.name} />
              </div>
              <span className="person-name">{person.name}</span>
            </div>
            <div className="col-location">
              {person.location}
            </div>
            <div className="col-occupation">
              <span className="occupation-tag">{person.occupation}</span>
              {person.tags && person.tags.map((tag, idx) => (
                <span key={idx} className="occupation-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PeopleSection;
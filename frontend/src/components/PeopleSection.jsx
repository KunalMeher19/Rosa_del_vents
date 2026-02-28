import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

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
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.from('.people-section .section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Table rows stagger with fade up
      gsap.from('.people-section .table-row', {
        scrollTrigger: {
          trigger: '.people-table',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle hover with smooth image follow
  const handleMouseEnter = (id, e) => {
    setHoveredId(id);

    if (imageRef.current) {
      gsap.killTweensOf(imageRef.current);

      gsap.fromTo(imageRef.current,
        {
          opacity: 0,
          scale: 0.7,
          rotation: -5
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'back.out(1.7)'
        }
      );

      // Position near cursor
      gsap.set(imageRef.current, {
        x: e.clientX - 75,
        y: e.clientY - 100
      });
    }
  };

  const handleMouseMove = (e) => {
    if (imageRef.current && hoveredId) {
      gsap.to(imageRef.current, {
        x: e.clientX - 75,
        y: e.clientY - 100,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredId(null);

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        scale: 0.7,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  // Row hover effect
  const handleRowMouseEnter = (e) => {
    const row = e.currentTarget;
    gsap.to(row, {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      x: 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleRowMouseLeave = (e) => {
    const row = e.currentTarget;
    gsap.to(row, {
      backgroundColor: 'transparent',
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const hoveredPerson = peopleData.find(p => p.id === hoveredId);

  return (
    <section id="people" className="people-section reveal-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title light">
          People<sup>({peopleData.length.toString().padStart(2, '0')})</sup>
        </h2>
        <a href="#all-people" className="explore-button light magnetic-light">
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
            onMouseEnter={(e) => {
              handleMouseEnter(person.id, e);
              handleRowMouseEnter(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={(e) => {
              handleMouseLeave();
              handleRowMouseLeave(e);
            }}
          >
            <div className="col-name">
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

      {/* Floating hover image */}
      <div
        ref={imageRef}
        className="floating-preview-person"
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 100,
          opacity: 0,
          width: '150px',
          height: '200px',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
        }}
      >
        {hoveredPerson && (
          <img
            src={hoveredPerson.image}
            alt={hoveredPerson.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </section>
  );
};

export default PeopleSection;
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import FlowingMenu from './FlowingMenu';

const aboutImages = [
  'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80',
  'https://images.unsplash.com/photo-1566218246241-934ae4d9e40a?w=600&q=80',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80',
  'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&q=80'
];

const PeopleSection = () => {
  const sectionRef = useRef(null);
  const { t, lang } = useLang();

  const menuItems = [
    { link: '#', text: lang === 'es' ? 'El Hostal' : 'The Hostel', image: aboutImages[0] },
    { link: '#', text: lang === 'es' ? 'Ubicación' : 'Location', image: aboutImages[1] },
    { link: '#', text: lang === 'es' ? 'Experiencias' : 'Experiences', image: aboutImages[2] },
    { link: '#', text: lang === 'es' ? 'Reservas' : 'Bookings', image: aboutImages[3] }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.people-section .section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
      gsap.from('.flowing-menu-container', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="nosotros" className="people-section reveal-section dark-theme" ref={sectionRef} style={{ backgroundColor: 'var(--color-bg-dark)', paddingBottom: '0' }}>
      <div className="section-header" style={{ marginBottom: '4rem' }}>
        <h2 className="section-title light" style={{ color: '#fff' }}>{t.about_title}</h2>
        <a href="#contacto" className="explore-button light magnetic-light" style={{ color: '#fff', borderColor: '#fff' }}>{t.about_explore}</a>
      </div>

      <div className="flowing-menu-container" style={{ height: '70vh', position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <FlowingMenu
          items={menuItems}
          speed={15}
          textColor="#ffffff"
          bgColor="var(--color-bg-dark)"
          marqueeBgColor="#ffffff"
          marqueeTextColor="var(--color-bg-dark)"
          borderColor="#333333"
        />
      </div>
    </section>
  );
};

export default PeopleSection;
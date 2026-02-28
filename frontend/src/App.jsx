import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HotelCarousel from './components/HotelCarousel';
import HotelsSection from './components/HotelsSection';
import LocationSpotlight from './components/LocationSpotlight';
import EditorsPicks from './components/EditorsPicks';
import PeopleSection from './components/PeopleSection';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP scroll-triggered reveals — run once loading is done
  useEffect(() => {
    if (!loading) {
      // Allow the CSS opacity transition to begin first
      const t = setTimeout(() => {
        const sections = gsap.utils.toArray('.reveal-section');
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        });

        gsap.utils.toArray('.float-img').forEach((img, i) => {
          gsap.to(img, {
            scrollTrigger: {
              trigger: '.location-spotlight',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            y: (i + 1) * -50,
            ease: 'none',
          });
        });
      }, 600);

      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <div className="App">
      <LoadingScreen isLoading={loading} />

      {/* Navigation mounts after loading */}
      {!loading && (
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}

      {/*
        Main content is ALWAYS in the DOM.
        Visibility is toggled by adding the 'visible' class,
        which triggers the CSS opacity transition in App.css.
        This avoids the GSAP timing issue where contentRef.current
        is null when the hook fires.
      */}
      <main className={`main-content${!loading ? ' visible' : ''}`}>
        <Hero />
        <HotelCarousel />
        <HotelsSection />
        <LocationSpotlight />
        <EditorsPicks />
        <PeopleSection />
        <InstagramFeed />
        <Footer />
      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Nav';
import Hero from './components/Hero';
import HotelCarousel from './components/HotelCarousel';
import HotelsSection from './components/HotelsSection';
import LocationSpotlight from './components/LocationSpotlight';
import EditorsPicks from './components/EditorsPicks';
import PeopleSection from './components/PeopleSection';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading time for the animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {loading && <LoadingScreen />}

      <Navigation 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen}
        scrollY={scrollY}
      />

      <main className={`main-content ${!loading ? 'visible' : ''}`}>
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
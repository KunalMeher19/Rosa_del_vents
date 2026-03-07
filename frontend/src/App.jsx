import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

import { LanguageProvider, useLang } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BookingBanner from './components/BookingBanner';
import HotelCarousel from './components/HotelCarousel';
import HotelsSection from './components/HotelsSection';
import LocationSpotlight from './components/LocationSpotlight';
import EditorsPicks from './components/EditorsPicks';
import PeopleSection from './components/PeopleSection';
import InstagramFeed from './components/InstagramFeed';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function AppInner() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();

        if (href === '#') {
          lenis.scrollTo(0, { duration: 1.5 });
        } else {
          lenis.scrollTo(href, { offset: -80, duration: 1.5 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => {
        const sections = gsap.utils.toArray('.reveal-section');
        sections.forEach((section) => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.9,
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

  const { lang } = useLang();

  // Refresh GSAP ScrollTriggers when language changes (page height may change)
  useEffect(() => {
    if (!loading) {
      // Small delay to let React render the new language strings
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(t);
    }
  }, [lang, loading]);

  return (
    <div className="App">
      <LoadingScreen isLoading={loading} />

      {!loading && (
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}

      <main className={`main-content${!loading ? ' visible' : ''}`}>
        <Hero />
        <HotelCarousel />
        <HotelsSection />
        <BookingBanner />
        <LocationSpotlight />
        <EditorsPicks />
        <PeopleSection />
        <InstagramFeed />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';
import './Navigation.css';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const Navigation = ({ menuOpen, setMenuOpen }) => {
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [theme, setTheme] = useState('light');
    const lastScrollY = useRef(0);
    const { lang, setLang, t } = useLang();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if passed hero
            setScrolled(currentScrollY > 80);

            // Determine scroll direction to hide/show
            if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY.current) {
                setHidden(false);
            }

            // Check theme underneath nav
            const navMidpointY = 50; // Approximating nav mid height on screen

            // Gather all sections explicitly marked as having a dark background theme
            const darkSections = document.querySelectorAll('.dark-theme');
            let isOverDark = false;

            darkSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // Check if the top of the nav intersects this section
                if (rect.top <= navMidpointY && rect.bottom >= navMidpointY) {
                    isOverDark = true;
                }
            });

            setTheme(isOverDark ? 'dark' : 'light');

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useLayoutEffect(() => {
        gsap.fromTo(navRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 1, ease: 'fade-in' }
        );
    }, []);

    useLayoutEffect(() => {
        if (menuOpen) {
            const tl = gsap.timeline();
            document.body.style.overflow = 'hidden';
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', pointerEvents: 'auto' })
                .to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
                .fromTo(linksRef.current,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
                    '-=0.3'
                );
        } else {
            const tl = gsap.timeline({ onComplete: () => { document.body.style.overflow = ''; } });
            tl.to(linksRef.current, { x: 30, opacity: 0, duration: 0.3, stagger: 0.05, ease: 'power2.in' })
                .to(menuRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' }, '-=0.2')
                .to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' }, '-=0.3');
        }
    }, [menuOpen]);

    const menuItems = [
        { label: t.nav_rooms, href: '#habitaciones' },
        { label: t.nav_gallery, href: '#galeria' },
        { label: t.nav_location, href: '#ubicacion' },
        { label: t.nav_about, href: '#nosotros' },
        { label: t.nav_contact, href: '#contacto' },
    ];

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <>
            <nav
                ref={navRef}
                className={`main-nav ${!scrolled ? '' : 'scrolled'} ${hidden ? 'hidden' : ''} ${theme === 'light' ? '' : 'theme-dark'}`}
                style={{ opacity: 0 }}
            >
                <div className="nav-left">
                    <a href="#hero" className="logo">
                        Rosa dels Vents
                    </a>
                </div>
                <div className="nav-right">
                    {/* Language toggle */}
                    <button
                        className="lang-toggle"
                        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                        aria-label="Switch language"
                    >
                        {lang === 'es' ? 'EN' : 'ES'}
                    </button>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="nav-button">
                        {t.nav_book}
                    </a>
                    <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </nav>

            <div ref={overlayRef} className="menu-overlay" onClick={() => setMenuOpen(false)} style={{ opacity: 0, pointerEvents: 'none' }} />

            <div ref={menuRef} className="side-menu" style={{ transform: 'translateX(100%)' }}>
                <div className="side-menu-header">
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="nav-button light" onClick={handleLinkClick}>
                        {t.nav_book}
                    </a>
                    <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="side-menu-content">
                    <ul className="menu-links">
                        {menuItems.map((item, index) => (
                            <li key={index} ref={(el) => (linksRef.current[index] = el)}>
                                <a href={item.href} onClick={handleLinkClick}>{item.label}</a>
                            </li>
                        ))}
                    </ul>

                    <div className="menu-footer">
                        <span>{t.footer_rights}</span>
                        <div className="menu-footer-right">
                            <a href="tel:+34680889399">+34 680 889 399</a>
                            <span>{t.footer_year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;

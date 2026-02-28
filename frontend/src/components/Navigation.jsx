import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Navigation = ({ menuOpen, setMenuOpen }) => {
    const navRef = useRef(null);
    const menuRef = useRef(null);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menu open/close animations
    useLayoutEffect(() => {
        if (menuOpen) {
            const tl = gsap.timeline();

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            tl.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                pointerEvents: 'auto'
            })
                .to(menuRef.current, {
                    x: 0,
                    duration: 0.5,
                    ease: 'power3.out'
                }, '-=0.2')
                .from(linksRef.current, {
                    x: 50,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.08,
                    ease: 'power2.out'
                }, '-=0.3');
        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                }
            });

            tl.to(linksRef.current, {
                x: 30,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in'
            })
                .to(menuRef.current, {
                    x: '100%',
                    duration: 0.4,
                    ease: 'power3.in'
                }, '-=0.2')
                .to(overlayRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    pointerEvents: 'none'
                }, '-=0.3');
        }
    }, [menuOpen]);

    // Initial nav animation
    useLayoutEffect(() => {
        gsap.from(navRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            delay: 2.5,
            ease: 'power2.out'
        });
    }, []);

    const menuItems = [
        { label: 'Hotels', href: '#hotels' },
        { label: 'People', href: '#people' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ];

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <nav ref={navRef} className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-left">
                    <a
                        href="/"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        Rosa dels Vents
                    </a>
                </div>
                <div className="nav-right">
                    <a href="#contact" className="nav-button">
                        Contact
                    </a>
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </nav>

            <div
                ref={overlayRef}
                className="menu-overlay"
                onClick={() => setMenuOpen(false)}
                style={{ opacity: 0, pointerEvents: 'none' }}
            />

            <div
                ref={menuRef}
                className="side-menu"
                style={{ transform: 'translateX(100%)' }}
            >
                <div className="side-menu-header">
                    <a href="#contact" className="nav-button light" onClick={handleLinkClick}>
                        Contact
                    </a>
                    <button
                        className="menu-close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="side-menu-content">
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <div className="search-line"></div>
                    </div>

                    <ul className="menu-links">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                ref={(el) => (linksRef.current[index] = el)}
                            >
                                <a
                                    href={item.href}
                                    className={item.highlight ? 'highlight' : ''}
                                    onClick={handleLinkClick}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="menu-footer">
                        <span>ALL RIGHTS RESERVED</span>
                        <div className="menu-footer-right">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                            <span>©2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;

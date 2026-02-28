import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const BookingBanner = () => {
    const bannerRef = useRef(null);
    const { t } = useLang();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.booking-banner-content', {
                scrollTrigger: {
                    trigger: bannerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
            });
        }, bannerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="booking-banner" ref={bannerRef}>
            <div className="booking-banner-content">
                <p className="booking-banner-text">{t.booking_text}</p>
                <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-banner-button"
                >
                    {t.booking_button}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default BookingBanner;

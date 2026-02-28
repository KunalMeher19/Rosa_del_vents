import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useLang } from '../context/LanguageContext';

const BOOKING_URL = 'https://www.booking.com/hotel/es/hostal-rosa-dels-vents.es.html';

const ContactSection = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', dates: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const { t, lang } = useLang();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-left', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                x: -50, opacity: 0, duration: 0.9, ease: 'power3.out'
            });
            gsap.from('.contact-right', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        gsap.from('.contact-success', { y: 20, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
    };

    return (
        <section id="contacto" className="contact-section reveal-section" ref={sectionRef}>
            <div className="contact-inner">
                {/* Left: info */}
                <div className="contact-left">
                    <span className="contact-section-label">{t.contact_title}</span>
                    <h2 className="contact-heading">{t.contact_subtitle}</h2>

                    <div className="contact-info-grid">
                        <div className="contact-info-item">
                            <span className="contact-info-label">{t.contact_address_label}</span>
                            <a
                                href="https://www.google.com/maps/place/HOSTAL+ROSA+DELS+VENTS/@40.8730802,0.7075766,15.74z/data=!4m18!1m8!3m7!1s0x12a1197e29109ad9:0x7ea76ad0f4518a39!2sCarrer+Sant+Joan,+3,+43519+El+Perell%C3%B3,+Tarragona,+Spain!3b1!8m2!3d40.8758689!4d0.7124785!16s%2Fg%2F11cpbnsv3d!3m8!1s0x12a1197e2f667c19:0xfa1ce0a41ebf23c6!5m2!4m1!1i2!8m2!3d40.8758098!4d0.7125935!16s%2Fg%2F11c80cq9l_?hl=en&entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-info-value"
                            >
                                Carrer Sant Joan, 3<br />
                                43519 El Perelló<br />
                                Tarragona, España
                            </a>
                        </div>

                        <div className="contact-info-item">
                            <span className="contact-info-label">{t.contact_phone_label}</span>
                            <a href="tel:+34680889399" className="contact-info-value">+34 680 889 399</a>
                        </div>

                        <div className="contact-info-item">
                            <span className="contact-info-label">{t.contact_booking_label}</span>
                            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="contact-info-value booking-link">
                                Booking.com →
                            </a>
                        </div>

                        <div className="contact-info-item">
                            <span className="contact-info-label">{t.contact_email_label}</span>
                            <span className="contact-info-value contact-pending">
                                {lang === 'es' ? '(próximamente)' : '(coming soon)'}
                            </span>
                        </div>
                    </div>

                    {/* Embedded map via iframe */}
                    <div className="contact-map" style={{ position: 'relative', minHeight: '220px', borderRadius: '8px', overflow: 'hidden' }}>
                        {!iframeLoaded && (
                            <div className="contact-map-skeleton" style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundColor: '#e2ddd1',
                                animation: 'pulse 1.5s infinite ease-in-out'
                            }}></div>
                        )}
                        <iframe
                            title="Rosa dels Vents Map"
                            src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=HOSTAL%20ROSA%20DELS%20VENTS,%20Carrer%20Sant%20Joan,%203,%20El%20Perell%C3%B3+(Rosa%20dels%20Vents)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                            width="100%"
                            height="220"
                            style={{ border: 0, borderRadius: '8px', opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            onLoad={() => setIframeLoaded(true)}
                        />
                    </div>
                </div>

                {/* Right: form */}
                <div className="contact-right">
                    {submitted ? (
                        <div className="contact-success">
                            <div className="success-icon">✓</div>
                            <h3>{lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</h3>
                            <p>{lang === 'es' ? 'Nos pondremos en contacto contigo pronto.' : 'We will get back to you soon.'}</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>{t.contact_name}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t.contact_email}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t.contact_dates}</label>
                                <input
                                    type="text"
                                    placeholder={lang === 'es' ? 'Ej: 15 jul – 20 jul' : 'E.g: Jul 15 – Jul 20'}
                                    value={formData.dates}
                                    onChange={e => setFormData({ ...formData, dates: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>{t.contact_message}</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="contact-submit">
                                {t.contact_send}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;

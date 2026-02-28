import React, { createContext, useContext, useState } from 'react';

const translations = {
    es: {
        // Nav
        nav_rooms: 'Habitaciones',
        nav_gallery: 'Galería',
        nav_location: 'Ubicación',
        nav_about: 'Nosotros',
        nav_contact: 'Contacto',
        nav_book: 'Reservar',

        // Hero
        hero_title_1: 'Tu descanso',
        hero_title_2: 'en el Mediterráneo',
        hero_subtitle: 'HOSTAL ROSA DELS VENTS · EL PERELLÓ · TARRAGONA',
        hero_button: 'Reservar ahora',
        hero_scroll: 'EXPLORAR',

        // Booking Banner
        booking_text: '¿Listo para reservar? Comprueba disponibilidad en Booking.com',
        booking_button: 'Ver disponibilidad',

        // Rooms Carousel
        rooms_title: 'Habitaciones',
        rooms_subtitle: 'Cada habitación es única',
        rooms_explore: 'Ver habitaciones',
        rooms_from: 'Desde',
        rooms_night: '/noche',

        // Amenities
        amenities_title: 'El hostal',
        amenities_explore: 'Contactar',
        amenities_col1: 'HABITACIÓN',
        amenities_col2: 'CAPACIDAD',
        amenities_col3: 'CARACTERÍSTICAS',

        // Location Spotlight
        location_label: 'UBICACIÓN',
        location_title: 'El Perelló, Tarragona',
        location_subtitle: 'Costa Daurada — donde el mar lo es todo.',
        location_button: 'Cómo llegar',

        // Nearby
        nearby_title: 'Alrededores',
        nearby_explore: 'Ver más',

        // About
        about_title: 'Nosotros',
        about_explore: 'Contáctanos',
        about_col1: 'NOMBRE',
        about_col2: 'DESCRIPCIÓN',
        about_col3: 'INFO',

        // Gallery
        gallery_button: 'Ver galería completa',

        // Contact
        contact_title: 'Contacto',
        contact_subtitle: 'Escríbenos o llámanos',
        contact_name: 'Nombre',
        contact_email: 'Email',
        contact_message: 'Mensaje',
        contact_dates: 'Fechas de estancia (opcional)',
        contact_send: 'Enviar mensaje',
        contact_phone_label: 'TELÉFONO',
        contact_address_label: 'DIRECCIÓN',
        contact_booking_label: 'RESERVAS',
        contact_email_label: 'EMAIL',

        // Footer
        footer_tagline: 'Hostal familiar en el corazón de El Perelló.',
        footer_rights: 'TODOS LOS DERECHOS RESERVADOS',
        footer_year: '©2025',
        footer_privacy: 'POLÍTICA DE PRIVACIDAD',
        footer_legal: 'AVISO LEGAL',
        footer_accessibility: 'ACCESIBILIDAD',
    },
    en: {
        // Nav
        nav_rooms: 'Rooms',
        nav_gallery: 'Gallery',
        nav_location: 'Location',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_book: 'Book',

        // Hero
        hero_title_1: 'Your retreat',
        hero_title_2: 'on the Mediterranean',
        hero_subtitle: 'HOSTAL ROSA DELS VENTS · EL PERELLÓ · TARRAGONA',
        hero_button: 'Book now',
        hero_scroll: 'EXPLORE',

        // Booking Banner
        booking_text: 'Ready to book? Check availability on Booking.com',
        booking_button: 'Check availability',

        // Rooms Carousel
        rooms_title: 'Rooms',
        rooms_subtitle: 'Every room is unique',
        rooms_explore: 'View rooms',
        rooms_from: 'From',
        rooms_night: '/night',

        // Amenities
        amenities_title: 'The hostel',
        amenities_explore: 'Contact us',
        amenities_col1: 'ROOM',
        amenities_col2: 'CAPACITY',
        amenities_col3: 'FEATURES',

        // Location Spotlight
        location_label: 'LOCATION',
        location_title: 'El Perelló, Tarragona',
        location_subtitle: 'Costa Daurada — where the sea is everything.',
        location_button: 'Get directions',

        // Nearby
        nearby_title: 'Nearby',
        nearby_explore: 'See more',

        // About
        about_title: 'About us',
        about_explore: 'Contact us',
        about_col1: 'NAME',
        about_col2: 'DESCRIPTION',
        about_col3: 'INFO',

        // Gallery
        gallery_button: 'View full gallery',

        // Contact
        contact_title: 'Contact',
        contact_subtitle: 'Write or call us',
        contact_name: 'Name',
        contact_email: 'Email',
        contact_message: 'Message',
        contact_dates: 'Stay dates (optional)',
        contact_send: 'Send message',
        contact_phone_label: 'PHONE',
        contact_address_label: 'ADDRESS',
        contact_booking_label: 'BOOKING',
        contact_email_label: 'EMAIL',

        // Footer
        footer_tagline: 'A family hostel in the heart of El Perelló.',
        footer_rights: 'ALL RIGHTS RESERVED',
        footer_year: '©2025',
        footer_privacy: 'PRIVACY POLICY',
        footer_legal: 'LEGAL NOTICE',
        footer_accessibility: 'ACCESSIBILITY',
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('es');
    const t = translations[lang];
    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = () => useContext(LanguageContext);

export default LanguageContext;

import React from 'react';

const instagramImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80',
    alt: 'Restaurant interior'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    alt: 'Food plating'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80',
    alt: 'Kitchen scene'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80',
    alt: 'Wine cellar'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
    alt: 'Cocktail'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80',
    alt: 'Resort view'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&q=80',
    alt: 'Hotel room'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80',
    alt: 'Luxury suite'
  }
];

const InstagramFeed = () => {
  return (
    <section className="instagram-feed">
      <div className="instagram-grid">
        {instagramImages.map((img, index) => (
          <div 
            key={img.id} 
            className={`insta-item insta-item-${index + 1}`}
          >
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      <div className="instagram-cta">
        <a 
          href="https://instagram.com/hafhcircle" 
          target="_blank" 
          rel="noopener noreferrer"
          className="insta-button"
        >
          See more on Instagram
        </a>
      </div>
    </section>
  );
};

export default InstagramFeed;
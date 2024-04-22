import React from 'react';

const Card = ({ imageSrc, title, description, link }) => (
  <div className="card">
    <div className="card-img">
      <a href={link}>
        <img src={imageSrc} alt={title} />
      </a>
    </div>
    <div className="card-desc">
      <h4 className="card-title">{title}</h4>
      <p className="card-text">{description}</p>
    </div>
  </div>
);

const CardsGalleryComponent = ({ events }) => (
    <div className="cards-gallery">
      {events ? (
        events.map((event, index) => (
          <Card
            key={index}
            imageSrc={event.imageSrc}
            title={event.title}
            description={event.description}
            link={event.link}
          />
        ))
      ) : (
        <p>Немає результатів для відображення.</p> // повідомлення, коли немає подій
      )}
    </div>
  );
  

export default CardsGalleryComponent;

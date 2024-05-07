import React from 'react';
import { Link } from 'react-router-dom';


const Card = ({ eventId, imageSrc, name, description, organizer }) => (
  <Link to={`/event/${eventId}`} className="card-link"> 
    <div className="card">
      <div className="card-img">
        <img src={imageSrc} alt={name} />
      </div>
      <div className="card-desc">
        <h4 className="card-title">{name}</h4>
        <p className="card-organizer">Організатор: {organizer}</p>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </Link>
);

const CardsGalleryComponent = ({ events }) => (
  <div className="cards-gallery">
    {events && events.length > 0 ? (
      events.map((event) => (
        <Card
          key={event.id}
          eventId={event.id} 
          imageSrc={event.imageSrc}
          name={event.name}
          description={event.description}
          organizer={event.organizer} 
        />
      ))
    ) : (
      <p>Немає результатів для відображення.</p>
    )}
  </div>
);

export default CardsGalleryComponent;

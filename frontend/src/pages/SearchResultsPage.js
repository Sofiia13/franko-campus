import React, { useEffect, useState } from 'react';
import FormRadioComponent from '../components/FormRadioComponent';
import CardsGalleryComponent from '../components/CardsGalleryComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchResultsPage() {
  let searchingQuery = useParams().query;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/events/search-events/${searchingQuery}`);
        setEvents(response.data);
        console.log(response.data)
      } catch (error) {
        alert("Сталась помилка під час пошуку.");
      }
    };

    fetchData();
  }, [searchingQuery]);

  return (
    <div className='search-content'>
      <section className='search-filter'>
        <FormRadioComponent />
        <button className='submit-button'>Застосувати фільтри</button>
      </section>
      <section className="search-results">
        <h2 className="section-title">Результати пошуку</h2>
        {/* Pass events as a prop to CardsGalleryComponent */}
        <CardsGalleryComponent events={events} />
      </section>
    </div>
  );
}

export default SearchResultsPage;

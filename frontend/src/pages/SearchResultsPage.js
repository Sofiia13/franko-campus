import React, { useEffect, useState } from 'react';
import FormRadioComponent from '../components/FormRadioComponent';
import CardsGalleryComponent from '../components/CardsGalleryComponent';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SearchResultsPage() {
  const { createClient } = require("@supabase/supabase-js");

  let searchingQuery = useParams().query;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData(searchingQuery);
  }, [searchingQuery]);

  const fetchData = async (query) => {
    try {
      const credentials = await axios.get("http://localhost:3001/events/supabase-credentials");
      const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);

      const eventsResponse = await axios.get(`http://localhost:3001/events/search-events/${query}`);

      if (eventsResponse.data.length === 0) {
        setEvents([]);
        return;
      }

      const updatedEvents = await processEventsData(eventsResponse.data, supabase);

      setEvents(updatedEvents);

    } catch (error) {
      alert("Сталась помилка під час пошуку.");
    }
  };

  const useFilters = async () => {
    try {
      const format = document.querySelector('input[name="format"]:checked')?.value || '';
      const payment = document.querySelector('input[name="payment"]:checked')?.value || '';
      const type = document.querySelector('input[name="type"]:checked')?.value || '';

      const credentials = await axios.get("http://localhost:3001/events/supabase-credentials");
      const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);

      const eventsResponse = await axios.get(`http://localhost:3001/events/search-events/${searchingQuery}?format=${format}&cost=${payment}&type=${type}`);

      if (eventsResponse.data.length === 0) {
        setEvents([]);
        return;
      }

      const updatedEvents = await processEventsData(eventsResponse.data, supabase);

      setEvents(updatedEvents);

    } catch (error) {
      alert("Сталась помилка під час фільтрації.");
    }
  };

  const processEventsData = async (eventsData, supabase) => {
    return Promise.all(eventsData.map(async (event) => {
      const { data, error } = await supabase
        .storage
        .from('campus-bucket')
        .download(`${event.images[0]}`);

      if (error) {
        event.imageSrc = null;
        return event;
      }

      event.imageSrc = URL.createObjectURL(data);
      return event;
    }));
  };

  return (
    <div className='search-content'>
      <section className='search-filter'>
        <FormRadioComponent />
        <button className='submit-button' onClick={useFilters}>Застосувати фільтри</button>
        <button className='submit-button' onClick={() => window.location.reload()}>Скинути фільтри</button>
      </section>
      <section className="search-results">
        <h2 className="section-title">Результати пошуку</h2>
        <CardsGalleryComponent events={events} />
      </section>
    </div>
  );
}

export default SearchResultsPage;

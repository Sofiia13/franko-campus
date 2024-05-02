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
    const fetchData = async () => {
      try {
        const credentials = await axios.get("http://localhost:3001/events/supabase-credentials");
        const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);

        const eventsResponse = await axios.get(`http://localhost:3001/events/search-events/${searchingQuery}`);

        if (eventsResponse.data.length === 0) {
          setEvents([]);
          console.log(events)
          return;
        }

        const updatedEvents = await Promise.all(eventsResponse.data.map(async (event) => {
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
        
        setEvents(updatedEvents);

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

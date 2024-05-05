import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardsGalleryComponent from '../components/CardsGalleryComponent';

const CataloguePage = () => {

    const { createClient } = require("@supabase/supabase-js");

    const [events, setEvents] = useState([]);

    const fetchData = async (extended) => {
        try {
            const credentials = await axios.get("http://localhost:3001/events/supabase-credentials");
            const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);

            let eventsResponse;

            if (extended) {
                eventsResponse = await axios.get(`http://localhost:3001/events/events-list-extended?offset=${events.length}`);
            } else {
                eventsResponse = await axios.get("http://localhost:3001/events/events-list");
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
            console.error('Error:', error);
        }
    };

    const loadMore = () => {
        fetchData(true);
    }

    useEffect(() => {
        fetchData(false);
    }, []);

    return (
        <body>
            <div>
                <section className="content">
                    <h2 className="section-title">Каталог нещодавно опублікованих подій</h2>
                    <CardsGalleryComponent events={events} />
                </section>
                <div style={{ textAlign: 'center' }}>
                <button className="submit-button" onClick={loadMore}>Завантажити ще</button>
            </div>
            </div>
        </body>
    );
};

export default CataloguePage;
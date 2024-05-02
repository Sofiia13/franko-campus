import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardsGalleryComponent from '../components/CardsGalleryComponent'; 

const HomePage = () => {

    const { createClient } = require("@supabase/supabase-js");

    const [mainPhoto, setMainPhoto] = useState(null);
    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const credentials = await axios.get("http://localhost:3001/events/supabase-credentials");
                const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);

                const { data, error } = await supabase
                    .storage
                    .from('campus-bucket')
                    .download('public/home-page-photo.png');

                if (error) {
                    throw new Error('Error happened while downloading file');
                }

                const base64Image = URL.createObjectURL(data);
                setMainPhoto(base64Image);

                const eventsResponse = await axios.get("http://localhost:3001/events/events-list");
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <body>
            <div className="main-card-img">
                <img src={mainPhoto} className="main-img" alt="..." />
                <div className="main-card-text">
                    <h3>Franko Campus</h3>
                    <p>соціальний проект, що дозволяє студентам знаходити нові можливості в університетському середовищі</p>
                </div>
            </div>

            <section className="content">
                <h2 className="section-title">Нещодавно опубліковані події</h2>
                <CardsGalleryComponent events={events} />
            </section>
        </body>
    );
};

export default HomePage;

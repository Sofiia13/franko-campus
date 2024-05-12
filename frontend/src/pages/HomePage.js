import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import CardsGalleryComponent from '../components/CardsGalleryComponent'; 

const HomePage = () => {

    const { createClient } = require("@supabase/supabase-js");
    const [mainPhoto, setMainPhoto] = useState(null);
    const [events, setEvents] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);


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

        const checkLogin = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/conventional-check-token'); 
                if (response.status === 200) {
                    setLoggedIn(true);
                    return
                }
            } catch (error) {
                setLoggedIn(false);
            }
        }
    
        fetchData();
        checkLogin();
    }, []);
    


    return (
        <body>
            <div className='error-login'>
                {!loggedIn && <div className="error-message">Схоже, що ви не залоговані. Увійдіть <a href="/auth/login">тут.</a></div>}
            </div>

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

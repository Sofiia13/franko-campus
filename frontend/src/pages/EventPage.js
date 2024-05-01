import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function EventPage() {
    let navigate = useNavigate();
    const [eventObject, setEventObject] = useState({});
    const [registeredToEvent, setRegisteredToEvent] = useState(false);
    let { id } = useParams();


    const { createClient } = require("@supabase/supabase-js");
    const [eventPhoto, setEventPhoto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const credentials = await axios.get("http://localhost:3001/events/supabase-credentials" )          //запит для отримання даних для доступу до supabase
                const supabase = await createClient(credentials.data.SUPABASE_URL, credentials.data.SUPABASE_KEY);  

                const response = await axios.get(
                    `http://localhost:3001/events/event/${id}`
                );

                setEventObject(response.data);

                const { data, error } = await supabase
                    .storage
                    .from('campus-bucket')
                    .download(`${response.data.images[0]}`);
    
                if (error) {
                    throw new Error('Error happened while downloading file');
                }

                const base64Image = URL.createObjectURL(data);          //перетворення отриманого файлу в base64
                setEventPhoto(base64Image); 

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    alert("Подія не знайдена");
                } else {
                    alert("Сталася помилка під час отримання даних про подію або його зображення");
                }
            }
        };

        fetchData();
    }, [id, navigate]);

    useEffect(() => {
        const checkIfRegistered = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/events/check-signup-to-event/${id}`
                );
                setRegisteredToEvent(response.status !== 404);
            } catch (error) {
                console.log("Сталася помилка під час перевірки реєстрації на подію");
            }
        };
        checkIfRegistered();
    }, [id]);

    const signupToEvent = async () => {
        try {
            await axios.post(
                `http://localhost:3001/events/signup-to-event/${id}`
            );
            setRegisteredToEvent(true);
            alert("Ви успішно записались на подію");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Подія не знайдена, або некоректний ID користувача");
            } else {
                alert("Сталася помилка під час запису на подію");
            }
        }
    };

    const cancelEventRegistration = async () => {
        try {
            await axios.post(
                `http://localhost:3001/events/cancel-event-reg/${id}`
            );
            setRegisteredToEvent(false);
            alert("Ви успішно відмінили запис на подію");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                alert("Подія не знайдена, або некоректний ID користувача");
            } else {
                alert("Сталася помилка під час запису на подію");
            }
        }
    };

    return (
        <body>
            <section className="content">
                <div className='event-content'>
                    <div className='event-photo'>
                        <img src={eventPhoto} alt="event photo" />
                    </div>
                    <div className='event-info'>
                        <h2 className="event-name">{eventObject.name}</h2>
                        <div className='event-organizer'>
                            {/* <div className='event-organizer-photo'>
                                <img src="..." alt="organizer photo" />
                            </div> */}
                            <h3>Організатор: {eventObject.organizer}</h3>
                        </div>
                        {/* Я додав інформацію про формат-вартість-тип тут, адже тут воно виглядало найкраще з точки зору стилів
                        тому, його потрібно буде переписати і поставити на інше місце, мабуть */}
                        
                        <p>Формат: {eventObject.format}</p>
                        <p>Вартість: {eventObject.cost}</p>
                        <p>Тип: {eventObject.type}</p>
                    </div>
                </div>
                <div className='section-title'>
                    <h2 className="section-title">Інформація</h2>
                </div>
                <div className='event-description'>
                    <p>
                        {eventObject.description}
                    </p>
                </div>
                <div>
                    <button className='submit-button' onClick={registeredToEvent === false ? signupToEvent : cancelEventRegistration}>
                        {registeredToEvent === false ? 'Записатися на подію' : 'Скасувати реєстрацію'}
                    </button>
                </div>
                <div className='section-title'>
                    {/*<h2 className="section-title">Коментарі</h2>*/}
                </div>
                <div className='comments'>
                    <div className='comment-input'></div>
                    <div className='comment'></div>
                </div>
            </section>
        </body>
    );
}

export default EventPage;

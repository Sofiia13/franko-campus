import React, { useEffect, useState } from 'react'
import bookmark from '../img/bookmark.svg';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 

function ProfilePage() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3001/profile/get-profile-info/'
                );
                setUserData(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    alert("Користувача або дані про профіль не знайдено");
                } if (error.response && error.response.status === 403) {
                    navigate("/auth/login")
                } else {
                    console.log("Сталася помилка під час отримання даних про користувача");
                }
            }
        };

        fetchData();
    }, []);

    const logout = async () => {
        try {
            await axios.get('http://localhost:3001/auth/logout');
            navigate("/auth/login");
        } catch (error) {
            alert("Помилка при виході з облікового запису");
        }
    }

  return (
    <body>
        <section className="content">
            <div className='user-content'>
                <div className='user-photo'>
                    <img src="..." alt="..." />
                </div>
                <div className='user-info'>
                    <h2 className="user-name">{userData.username === undefined ? "Отримання даних..." : userData.username}</h2>
                    <div className='user-text'>
                        <h3>Ім'я:</h3>
                        <p>{userData.first_name === undefined ? "Не заповнено" : userData.first_name}</p>
                    </div>
                    <div className='user-text'>
                        <h3>Прізвище:</h3>
                        <p>{userData.last_name === undefined ? "Не заповнено" : userData.last_name}</p>
                    </div>
                    <div className='user-text'>
                        <h3>Статус:</h3>
                        <p>{userData.status === undefined ? "Не заповнено" : userData.status}</p>
                    </div>
                    <div className='user-text'>
                        <h3>Університет:</h3>
                        <p>{userData.university === undefined ? "Не заповнено" : userData.university}</p>
                    </div>
                    <div className='user-text'>
                        <h3>Факультет:</h3>
                        <p>{userData.faculty === undefined ? "Не заповнено" : userData.faculty}</p>
                    </div>
                    {/* Поки що я наклав на цю кнопку стиль submit-button, потрібно буде створити інший стиль */}
                    <button className='submit-button' onClick={logout}>Вийти з облікового запису</button>
                    <button className='submit-button' onClick={() => navigate("/editprofile")}>Редагувати профіль</button>
                </div>
            </div>
            <div className='section-title'>
                <h2 className="section-title">Закладки</h2>
                <img className='section-icon' src={bookmark} alt="Bookmark" />
            </div>
            <div className="cards-gallery">
                <div className="card">
                    <div className="card-img">
                        <a href="">
                            <img src="..." alt="..." />
                        </a>
                    </div> 
                    <div className="card-desc">
                        <h4 className="card-title">Some card-title</h4>
                        <p className="card-text"> some card-text some card-text</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-img">
                        <a href="">
                            <img src="..." alt="..." />
                        </a>
                    </div> 
                    <div className="card-desc">
                        <h4 className="card-title">Some card-title</h4>
                        <p className="card-text"> some card-text some card-text</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-img">
                        <a href="">
                            <img src="..." alt="..." />
                        </a>
                    </div> 
                    <div className="card-desc">
                        <h4 className="card-title">Some card-title</h4>
                        <p className="card-text"> some card-text some card-text</p>
                    </div>
                </div>
            </div>
            <div>
                <div className='section-title'>
                    <h2 className="section-title">Опубліковані події</h2>
                </div>
                <div className="cards-gallery">
                    <p>
                    Ви не маєте опублікованих подій <br/>
                    Щоб дізнатися як, створити подію перейдіть за <a href=''>посиланням</a>
                    </p>
                </div>
            </div>
        </section>
    </body>
  )
}

export default ProfilePage
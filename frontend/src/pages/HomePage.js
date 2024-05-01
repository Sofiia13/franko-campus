import React, {useEffect, useState} from 'react';
import axios from 'axios';

const HomePage = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
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
        checkLogin();
    }, [])
    useEffect(() => {
        console.log(loggedIn); 
    }, [loggedIn]);

    

    return (
        <body>
            <div className="main-card-img">
                    <img src="..." className="main-img" alt="..." />
                    <div className="main-card-text">
                        <h3>Franko Campus</h3>
                        <p>соціальний проект, що дозволяє студентам знаходити нові можливості в університетському середовищі</p>
                    </div>
                </div>

            <section className="content">
                <h2 className="section-title">Нещодавно опубліковані події</h2>
                <div className="cards-gallery">
                    <div className="card">
                        <div className="card-img">
                            <a href="">
                                <img  src="..." alt="..." />
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
                                <img  src="..." alt="..." />
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
                                <img  src="..." alt="..." />
                            </a>
                        </div> 
                        <div className="card-desc">
                            <h4 className="card-title">Some card-title</h4>
                            <p className="card-text"> some card-text some card-text</p>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    );
};

export default HomePage;
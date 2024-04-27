import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {

    const { createClient } = require("@supabase/supabase-js");

    const [mainPhoto, setMainPhoto] = useState(null);


    useEffect(() => {
        const downloadImage = async () => {
            try {
                const response = await axios.get("http://localhost:3001/events/supabase-credentials" )
                const supabase = await createClient(response.data.SUPABASE_URL, response.data.SUPABASE_KEY);

                const { data, error } = await supabase
                    .storage
                    .from('campus-bucket')
                    .download('public/home-page-photo.png');
    
                if (error) {
                    throw new Error('Error happened while downloading file');
                }
    
                const base64Image = URL.createObjectURL(data);
                setMainPhoto(base64Image);
            } catch (error) {
                console.error('Error downloading image:', error);
            }
        };
    
        downloadImage();
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
            </section>
        </body>
    );
};

export default HomePage;
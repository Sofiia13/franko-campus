import React from 'react'
import bookmark from '../img/bookmark.svg';

function ProfilePage() {
  return (
    <body>
        <section className="content">
            <div className='user-content'>
                <div className='user-photo'>
                    <img src="..." alt="..." />
                </div>
                <div className='user-info'>
                    <h2 className="user-name">UserName</h2>
                    <div className='user-text'>
                        <h3>Ім'я:</h3>
                        <p>Ім'я</p>
                    </div>
                    <div className='user-text'>
                        <h3>Прізвище:</h3>
                        <p>Прізвище</p>
                    </div>
                    <div className='user-text'>
                        <h3>Статус:</h3>
                        <p>Студент</p>
                    </div>
                    <div className='user-text'>
                        <h3>Університет:</h3>
                        <p>Університет</p>
                    </div>
                    <div className='user-text'>
                        <h3>Факультет:</h3>
                        <p>Факультет</p>
                    </div>
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
                    Щоб дізнатися як створити подію перейдіть за <a href=''>посиланням</a>
                    </p>
                </div>
            </div>
        </section>
    </body>
  )
}

export default ProfilePage
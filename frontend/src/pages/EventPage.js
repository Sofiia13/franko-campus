import React from 'react'

function EventPage() {
  return (
    <body>
        <section className="content">
            <div className='event-content'>
                <div className='event-photo'>
                    <img src="..." alt="event photo" />
                </div>
                <div className='event-info'>
                    <h2 className="event-name">Назва Івенту</h2>
                    <div className='event-organizer'>
                        <div className='event-organizer-photo'>
                            <img src="..." alt="organizer photo" />
                        </div>
                        <h3>Організатор івенту</h3>
                    </div>
                </div>
            </div>
            <div className='section-title'>
                <h2 className="section-title">Інфрмація</h2>
            </div>
            <div className='event-description'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div>
            <button className='submit-button'>Записатися на подію</button>
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
  )
}

export default EventPage
import React from 'react';

const ValidationPage = () => {
    return (
        <body>
            <div className="form-area">
                <h3 className="login-title">Введіть код<br/>підтвердження</h3>
                <form className='form-content' action="submit_form" method="post">
                    <input className="input-wrapper" type="name" id="email" name="email" placeholder="Ваш юзернейм чи пошта" required/>
                    <input className="input-wrapper" type="text" id="validationCode" name="validationCode" placeholder="Ваш код" required/>
                    <button className="submit-button" type="submit">Підтвердити</button>
                    <p className="text-link"><a href="" className="link">Надіслати код ще раз</a></p>
                </form>
            </div>
        </body>
    );
};

export default ValidationPage;
import React from 'react';

const SignInPage = () => {
    return (
        <body>
            <div className="form-area">
                <h3 className="login-title">Зареєструватись<br /> у Franko Campus</h3>
                <form action="submit_form" method="post">
                    <input className="input-wrapper" type="username" id="username" name="username" placeholder="Ім'я та Прізвище" required />
                    <input className="input-wrapper" type="email" id="email" name="email" placeholder="Пошта" required />
                    <input className="input-wrapper" type="text" id="university" name="university" placeholder="Назва університету" required />
                    <input className="input-wrapper" type="password" id="password" name="password" placeholder="Пароль" required />
                    <button className="submit-button" type="submit" id="registerButton">Зареєструватись</button>
                    <p className="text-link">Вже маєте акаунту? <a href="login" className="link">Увійти</a></p>
                </form>
            </div>
        </body>
    );
};

export default SignInPage;
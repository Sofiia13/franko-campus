import React from "react";

function loginPage() {
    return (
        <body>
            <div className="form-area">
                <h3 className="login-title">Увійти <br/> у Franko Campus</h3>
                <form className='form-content' action="submit_form" method="post">
                    <input className="input-wrapper" type="email" id="email" name="email" placeholder="Ваш юзернейм чи пошта" required/>
                    <input className="input-wrapper" type="password" id="password" name="password" placeholder="Ваш пароль" required/>
                    <button className="submit-button" type="submit" id="loginButton">Увійти</button>
                    <p className="text-link">Не маєте акаунту? <a href="signin" className="link">Зареєструватись</a></p>
                </form>
            </div>
        </body>
    );
}

export default loginPage;
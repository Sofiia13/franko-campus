import React from 'react';

const ValidationPage = () => {
    return (
        <body>
            <div class="form-area">
                <h3 class="login-title">Введіть код<br/>підтвердження</h3>
                <form action="submit_form" method="post">
                    <input class="input-wrapper" type="name" id="email" name="email" placeholder="Ваш юзернейм чи пошта" required/>
                    <input class="input-wrapper" type="text" id="validationCode" name="validationCode" placeholder="Ваш код" required/>
                    <button class="submit-button" type="submit">Підтвердити</button>
                    <p class="text-link"><a href="" class="link">Надіслати код ще раз</a></p>
                </form>
            </div>
        </body>
    );
};

export default ValidationPage;
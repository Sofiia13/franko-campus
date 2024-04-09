import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reqUsername: '',
        reqPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', formData);
            console.log('Response:', response.data);
            if (response.data.success === true) {
                // ендпойнт успішої авторизації
                // JWT
                alert('Успішний вхід');
                navigate('/');
            } else {
                // якщо з сервера прийшла помилка
                //placeholder
                alert('Помилка під час логіну')
            }
        } catch (error) {
            // якщо помилка на клієнті
            console.error('Error:', error);
            alert('Помилка: ' + error.message)
        }
    };

    return (
        <body>
            <div className="form-area">
                <h3 className="login-title">Увійти <br/> у Franko Campus</h3>
                <form className='form-content' onSubmit={handleSubmit}>
                    <input className="input-wrapper" type="text" id="username" name="reqUsername" placeholder="Ваш юзернейм чи пошта (поки лише юзернейм)" value={formData.reqUsername} onChange={handleChange} required />
                    <input className="input-wrapper" type="password" id="password" name="reqPassword" placeholder="Ваш пароль" value={formData.reqPassword} onChange={handleChange} required />
                    <button className="submit-button" type="submit" id="loginButton">Увійти</button>
                    <p className="text-link">Не маєте акаунту? <a href="signin" className="link">Зареєструватись</a></p>
                </form>
            </div>
        </body>
    );
};

export default LoginPage;

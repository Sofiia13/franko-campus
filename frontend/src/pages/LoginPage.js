import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reqUsername: '',
        reqPassword: ''
    });

    const [errorMessages, setErrorMessages] = useState({
      reqUsername: '',
      reqPassword: '',
      general: ''
  });

    useEffect(() => {
        const handleCheckToken = async () => {
          try {
            const response = await axios.get('http://localhost:3001/auth/check-token', {
              withCredentials: true
            });
            console.log('Response:', response.data);
          } catch (error) {
            if (error.response && error.response.status === 403) {
              setErrorMessages({
                ...errorMessages,
                general: 'Ви вже авторизовані!'
              });
              console.error('Unauthorized (403):', error);
              //navigate('/'); // перескерувати на "/" при помилці 403
            } else {
              console.error('Error:', error); // інші помилки
            }
          }
        };
      
        handleCheckToken();
      }, []);


    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrorMessages(prevState => ({
          ...prevState,
          [name]: ''
      }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', formData, { credentials: 'include', withCredentials: true });
            console.log('Response:', response.data);
            if (response.data.success === true) {
                // ендпойнт успішої авторизації
                // JWT
                alert('Успішний вхід!');
                navigate('/');
            } else {
                // якщо з сервера прийшла помилка
                setErrorMessages({
                    ...errorMessages,
                    general: 'Помилка під час входу, будь ласка, спробуйте знову.'
                });
            }
        } catch (error) {
            // якщо помилка на клієнті
            setErrorMessages({
              ...errorMessages,
              general: 'Помилка: ' + error.message
            });
            console.error('Error:', error);
        }
    };

    return (
        <body>
            <div className="form-area">
                <h3 className="login-title">Увійти <br /> у Franko Campus</h3>
                <form className='form-content' onSubmit={handleSubmit}>
                    <input className="input-wrapper" type="text" id="username" name="reqUsername" placeholder="Ваш юзернейм чи пошта (поки лише юзернейм)" value={formData.reqUsername} onChange={handleChange} required />
                    <input className="input-wrapper" type="password" id="password" name="reqPassword" placeholder="Ваш пароль" value={formData.reqPassword} onChange={handleChange} required />
                    <div className='error-general'>
                      {errorMessages.general && <div className="error-message">{errorMessages.general}</div>}
                    </div>
                    <button className="submit-button" type="submit" id="loginButton">Увійти</button>
                    <p className="text-link">Не маєте акаунту? <a href="signup" className="link">Зареєструватись</a></p>
                </form>
            </div>
        </body>
    );
};

export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 

const SignInPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reqUsername: '',
        reqPassword: '',
        reqEmail: '',
        reqUniversity: ''
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
            const response = await axios.post('http://localhost:3001/auth/register', formData);
            console.log('Response:', response.data);
            if (response.data.success === true) {
                // ендпойнт успішної реєстрації
                navigate("/validation"); 
            } else {
                // якщо з сервера прийшла помилка
                //placeholder
                alert('Помилка під час реєстрації')
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
                <h2 className="login-title">Зареєструватись<br /> у Franko Campus</h2>
                <form className='form-content' onSubmit={handleSubmit}>
                    <input className="input-wrapper" type="text" id="username" name="reqUsername" placeholder="Ваш юзернейм" value={formData.reqUsername} onChange={handleChange} required />
                    <input className="input-wrapper" type="email" id="email" name="reqEmail" placeholder="Пошта" value={formData.reqEmail} onChange={handleChange} required />
                    <input className="input-wrapper" type="text" id="university" name="reqUniversity" placeholder="Назва університету" value={formData.reqUniversity} onChange={handleChange} required />
                    <input className="input-wrapper" type="password" id="password" name="reqPassword" placeholder="Пароль" value={formData.reqPassword} onChange={handleChange} required />
                    <button className="submit-button" type="submit" id="registerButton">Зареєструватись</button>  
                </form>
                <p className="text-link">Вже маєте акаунт? <a href="login" className="link">Увійти</a></p>
            </div>
        </body>
    );
};

export default SignInPage;

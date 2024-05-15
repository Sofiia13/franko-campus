import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 
axios.defaults.withCredentials = true;

const EditProfilePage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reqUsername: '',
        reqPassword: '',
        reqEmail: '',
        reqUniversity: ''
    });

    const [errorMessages, setErrorMessages] = useState({
        reqUsername: '',
        reqPassword: '',
        reqEmail: '',
        reqUniversity: '',
        general: ''
    });

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
            const response = await axios.patch('http://localhost:3001/profile', formData);
            console.log('Response:', response.data);
            if (response.status === 200) {
                // ендпойнт успішної реєстрації
                navigate("/profile"); 
            } else {
                // якщо з сервера прийшла помилка
                setErrorMessages({
                    ...errorMessages,
                    general: 'Помилка під час редагування профілю, будь ласка, спробуйте знову.'
                });
            }
        } catch (error) {
            // якщо помилка на клієнті
            setErrorMessages({
                ...errorMessages,
                general: 'Помилка: ' + error.message
            });
        }
    };

    return (
        <body>
            <div className="form-area">
                <h2 className="login-title">Редагування профілю</h2>
                <form className='form-content' onSubmit={handleSubmit}>
                    <input className="input-wrapper" type="text" id="first_name" name="first_name" placeholder="Ваше ім'я" value={formData.first_name} onChange={handleChange} />
                    <input className="input-wrapper" type="text" id="last_name" name="last_name" placeholder="Ваше прізвище" value={formData.last_name} onChange={handleChange} />
                    <input className="input-wrapper" type="text" id="university" name="university" placeholder="Ваш університет" value={formData.university} onChange={handleChange} />
                    <input className="input-wrapper" type="text" id="status" name="status" placeholder="Ваш статус" value={formData.status} onChange={handleChange} />
                    <div className='error-general'>
                        {errorMessages.general && <div className="error-message">{errorMessages.general}</div>}
                    </div>
                    <button className="submit-button" type="submit" id="registerButton">Зберегти</button>  
                    <p>Якщо не хочете змінювати якісь поля, залишіть їх порожніми.</p>
                </form>
            </div>
        </body>
    );
};

export default EditProfilePage;

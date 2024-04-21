import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom'; 
axios.defaults.withCredentials = true;

const ValidationPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reqUsername: '',
        reqCode: ''
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
            const response = await axios.post('http://localhost:3001/auth/validate', formData);
            console.log('Response:', response.data);
            if (response.data.success === true) {
                // ендпойнт успішної валідації
                navigate("/auth/login"); 
            } else {
                // якщо з сервера прийшла помилка
                //placeholder
                alert('Помилка під час валідації')
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
                <h3 className="login-title">Введіть код<br/>підтвердження</h3>
                <form className='form-content' onSubmit={handleSubmit}>
                    <input className="input-wrapper" type="name" id="username" name="reqUsername" placeholder="Ваш юзернейм чи пошта (поки лише юзернейм)" value={formData.reqUsername} onChange={handleChange} required/>
                    <input className="input-wrapper" type="text" id="validationCode" name="reqCode" placeholder="Ваш код" value={formData.reqCode} onChange={handleChange} required/>
                    <button className="submit-button" type="submit">Підтвердити</button>
                    <p className="text-link"><a href="" className="link">Надіслати код ще раз</a></p>
                </form>
            </div>
        </body>
    );
};

export default ValidationPage;

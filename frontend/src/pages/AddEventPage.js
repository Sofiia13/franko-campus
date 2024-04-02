import React, { useState } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

function AddEventPage() {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileSelect(files) {
    const newImages = files.map(file => file.base64);
    setImages([...images, ...newImages]);
  }
  
  function deleteImage(index) {
    setImages(images.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, reader.result.split(',')[1]]);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  async function uploadImage() {
    const eventData = {
      reqName: eventName,
      reqDescription: eventDesc,
      reqOrganizer: 'TestOrganizer', // Hardcoded organizer
      reqImageBase64: images
    };

    try {
      const response = await axios.post('http://localhost:3001/events/event-registration', eventData);
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <body>
      <section className="content">
        <div className='Add-Event-form'>
          <h1 className="page-title">Створіть подію</h1>
          <div className='form-item'>
            <h3 className='category-title'>Назва події:</h3>
            <input className="Event-input" type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Назва вашої події" required />
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Опис події:</h3>
            <textarea className="Event-input" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} placeholder="Опис вашої події" required></textarea>
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Постер події:</h3>
            <div className='down-img-area'>
              <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                  <span className='select'> Перетягніть зображення сюди</span>
                ) : (
                  <>
                  Перетягніть зображення сюди або {" "}
                  <span className='select'>Завантажте</span>
                  </>
                )}
                <FileBase64 multiple={true} onDone={handleFileSelect} />
              </div>
              <div className='container'>
                {images.map ((image, index) => (
                  <div className='image' key={index}>
                    <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                    <img src={`data:image/jpeg;base64,${image}`} alt={`image_${index}`} />
                  </div>
                ))}  
              </div>
            </div> 
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Формат:</h3>
            <ul>
              <li className='list-item'>
                <input type="radio" value="Онлайн" className='check-input' /> 
                <p>Онлайн</p>
              </li>
              <li className='list-item'>
                <input type="radio" value="Офлайн" className='check-input' /> 
                <p>Офлайн</p>
              </li>
              <li className='list-item'>
                <input type="radio" value="Змішано" className='check-input' /> 
                <p>Змішано</p>
              </li>
            </ul> 
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Оплата:</h3>
            <ul>
              <li className='list-item'>
                <input type="radio" value="Платно" className='check-input' /> 
                <p>Платно</p>
              </li>
              <li className='list-item'>
                <input type="radio" value="Безкоштовно" className='check-input' /> 
                <p>Безкоштовно</p>
              </li>
            </ul> 
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Тип:</h3>
            <ul>
              <li className='list-item'>
                <input type="checkbox" value="Вебінар" className='check-input' /> 
                <p>Вебінар</p>
              </li>
              <li className='list-item'>
                <input type="checkbox" value="Змагання" className='check-input' /> 
                <p>Змагання</p>
              </li>
              <li className='list-item'>
                <input type="checkbox" value="Факультатив" className='check-input' /> 
                <p>Факультатив</p>
              </li>
              <li className='list-item'>
                <input type="checkbox" value="Дискусія" className='check-input' /> 
                <p>Дискусія</p>
              </li>
              <li className='list-item'>
                <input type="checkbox" value="Гурток" className='check-input' /> 
                <p>Гурток</p>
              </li>
              <li className='list-item'>
                <input type="checkbox" value="Інше" className='check-input' /> 
                <p>Інше</p>
              </li>
            </ul>
          </div>
          <button className='submit-button' onClick={uploadImage}>Створити подію</button>
        </div>
      </section>
    </body>
  );
}

export default AddEventPage;
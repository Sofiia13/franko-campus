import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'


function AddEventPage() {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFile() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
  
    const fileArray = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), 
      data: file,
    }));

  
    setImages([...images, ...fileArray]);
  }
  

  function deleteImage(index) {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
    
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
      if (!images.some( (e) => e.anme === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
 

  async function createEvent() {
    const eventData = {
      reqName: eventName,
      reqDescription: eventDesc,
      reqOrganizer: 'TestOrganizer', // Hardcoded organizer
    };
  
    try {
      const eventResponse = await axios.post('http://localhost:3001/events/event-registration', eventData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      const event_id = eventResponse.data.id;
  

        const formData = new FormData();
        images.forEach((image) => {
          formData.append('image', image.data, image.name);
          console.log('Image:', image.name);
        });



        console.log('Form data:', formData);
  
        try {
          const imageResponse = await axios.post(`http://localhost:3001/events/upload-image/${event_id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image API response:', imageResponse.data);
        } catch (error) {
          console.error('Error uploading image:', error);
        }

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
                    <span className='select'> Перетягніит зображення сюди</span>
                  ) : (
                    <>
                    Перетягніит зображення сюди або {" "}
                    <span className='select' role='button' onClick={selectFile}>
                      Завантажте
                    </span>
                    </>
                  )}
                  <input type="file" name="files" accept="image/*" className='file-input' ref={fileInputRef} onChange={onFileSelect} required/>
                </div>
                <div className='container'>
                  {images.map ((images, index) => (
                    <div className='image' key={index}>
                      <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                      <img src={images.url} alt={images.name} />
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
                  <input type="radio" value="Безплатно" className='check-input' /> 
                  <p>Безплатно</p>
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
            <button className='submit-button' onClick={createEvent}>Створити подію</button>
          </div>
        </section>
    </body>
  )
}

export default AddEventPage
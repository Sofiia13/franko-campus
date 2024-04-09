import React from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'


function AddEventPage() {
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [images, setImages] = useState([]);
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
      if (!images.some((e) => e.anme === files[i].name)) {
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
    try {
      const eventData = {
        reqName: eventName,
        reqDescription: eventDesc,
        reqOrganizer: 'HardcodedOrganizer', // Hardcoded organizer
        reqFormat: document.querySelector('input[name="format"]:checked').value,
        reqCost: document.querySelector('input[name="payment"]:checked').value,
        reqType: document.querySelector('input[name="type"]:checked').value,
      };

      const eventResponse = await axios.post('http://localhost:3001/events/create-event', eventData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const event_id = eventResponse.data.id;

      const formData = new FormData();
      images.forEach((image) => {
        formData.append('files', image.data, image.name);
      });

      await axios.post(`http://localhost:3001/events/upload-image/${event_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.error('Error creating or uploading event:', error);
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
                    <span className='select' role='button' onClick={selectFile}>
                      Завантажте
                    </span>
                  </>
                )}
                <input type="file" name="files" accept="image/*" className='file-input' ref={fileInputRef} onChange={onFileSelect} required />
              </div>
              <div className='container'>
                {images.map((images, index) => (
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
            <div>
              <input type="radio" name='format' value="Онлайн" id='Online' className='check-input' />
              <label for="Online">Онлайн</label><br />

              <input type="radio" name='format' value="Офлайн" id='Offline' className='check-input' />
              <label for="Offline">Офлайн</label><br />

              <input type="radio" name='format' value="Змішано" id='Mixed' className='check-input' />
              <label for="Mixed">Змішано</label><br />
            </div>
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Оплата:</h3>
            <div>
              <input type="radio" name='payment' value="Платно" id='Paid' className='check-input' />
              <label for="Paid">Платно</label><br />

              <input type="radio" name='payment' value="Безкоштовно" id='Free' className='check-input' />
              <label for="Free">Безкоштовно</label><br />
            </div>
          </div>
          <div className='form-item'>
            <h3 className='category-title'>Тип:</h3>
            <div>
              <input type="radio" name='type' value="Вебінар" id='Webinar' className='check-input' />
              <label for="Webinar">Вебінар</label><br />

              <input type="radio" name='type' value="Змагання" id='Competition' className='check-input' />
              <label for="Competition">Змагання</label><br />

              <input type="radio" name='type' value="Факультатив" id='Optional' className='check-input' />
              <label for="Optional">Факультатив</label><br />

              <input type="radio" name='type' value="Дискусія" id='Discussion' className='check-input' />
              <label for="Discussion">Дискусія</label><br />

              <input type="radio" name='type' value="Гурток" id='Circle' className='check-input' />
              <label for="Circle">Гурток</label><br />

              <input type="radio" name='type' value="Інше" id='Інше' className='check-input' />
              <label for="Other">Інше</label><br />
            </div>
          </div>
          <button className='submit-button' onClick={createEvent}>Створити подію</button>
        </div>
      </section>
    </body>
  )
}

export default AddEventPage
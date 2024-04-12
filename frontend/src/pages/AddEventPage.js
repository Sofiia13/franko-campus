import React from 'react'
import { useState, useRef } from 'react'

function AddEventPage() {

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFile() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.lenght === 0) return;
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

  function uploadImage() {
    console.log("Images:", images);
  }

  return (
    <body>
        <section className="content">
          <form className='Add-event-form'>
            <h1 className="page-title">Створіть подію</h1>
            <div className='form-item'>
              <h3 className='category-title'>Назва події:</h3>
              <input className="event-input" type="text" id="eventName" name="eventName" placeholder="Назва вошої події" required />
            </div>
            <div className='form-item'>
              <h3 className='category-title'>Опис події:</h3>
              <textarea className="event-input" type="text" id="eventDesc" name="eventDesc" placeholder="Опис вошої події" required></textarea>
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
                  <input type="file" accept="image/*" className='file-input' ref={fileInputRef} onChange={onFileSelect} required/>
                </div>
                <div className='container'>
                  {images.map ((images, index) => (
                    <div className='image' key={index}>
                      <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
                      <img src={images.url} alt={images.name} />
                    </div>
                  ))}  
                </div>
                <button type='button' className='down-button' onClick={uploadImage}>
                  Підтвердити
                </button>
              </div> 
            </div>
            <div className='form-item'>
              <h3 className='category-title'>Формат:</h3>
              <div>
                  <input type="radio" name='format' value="Online" id='Online' className='check-input' /> 
                  <label for="Online">Онлайн</label><br/>
                  
                  <input type="radio" name='format' value="Offline" id='Offline' className='check-input' /> 
                  <label for="Offline">Офлайн</label><br/>
                  
                  <input type="radio" name='format' value="Mixed" id='Mixed' className='check-input' /> 
                  <label for="Mixed">Змішано</label><br/>     
              </div> 
            </div>
            <div className='form-item'>
              <h3 className='category-title'>Оплата:</h3>
              <div>
                  <input type="radio" name='payment' value="Paid" id='Paid' className='check-input' /> 
                  <label for="Paid">Платно</label><br/> 
                  
                  <input type="radio" name='payment' value="Free" id='Free' className='check-input' /> 
                  <label for="Free">Безплатно</label><br/> 
              </div> 
            </div>
            <div className='form-item'>
              <h3 className='category-title'>Тип:</h3>
              <div>
                  <input type="radio" name='type' value="Webinar" id='Webinar' className='check-input' /> 
                  <label for="Webinar">Вебінар</label><br/>

                  <input type="radio" name='type' value="Competition" id='Competition' className='check-input' /> 
                  <label for="Competition">Змагання</label><br/>

                  <input type="radio" name='type' value="Optional" id='Optional' className='check-input' /> 
                  <label for="Optional">Факультатив</label><br/>

                  <input type="radio" name='type' value="Discussion" id='Discussion' className='check-input' /> 
                  <label for="Discussion">Дискусія</label><br/>

                  <input type="radio" name='type' value="Circle" id='Circle' className='check-input' /> 
                  <label for="Circle">Гурток</label><br/>

                  <input type="radio" name='type' value="Other" id='Other' className='check-input' /> 
                  <label for="Other">Інше</label><br/>
              </div>
            </div>
            <button className='submit-button'>Створити подію</button>
          </form>
        </section>
    </body>
  )
}

export default AddEventPage
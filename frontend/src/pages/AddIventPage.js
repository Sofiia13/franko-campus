import React from 'react'
import { useState, useRef } from 'react'


function AddIventPage() {

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
          <div className='Add-ivent-form'>
            <h1 className="page-title">Створіть подію</h1>
            <div className='form-item'>
              <h3 className='category-title'>Назва події:</h3>
              <input className="ivent-input" type="text" id="IventName" name="IventName" placeholder="Назва вошої події" required />
            </div>
            <div className='form-item'>
              <h3 className='category-title'>Опис події:</h3>
              <textarea className="ivent-input" type="text" id="IventDesc" name="IventDesc" placeholder="Опис вошої події" required></textarea>
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
                  Завантажити
                </button>
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
            <button className='submit-button'>Створити подію</button>
          </div>
        </section>
    </body>
  )
}

export default AddIventPage
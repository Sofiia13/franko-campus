import React from 'react';

const RadioGroup = ({ title, name, options }) => (
  <div className='form-item'>
    <h3 className='category-title'>{title}:</h3>
    <div>
      {options.map((option, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={name}
            value={option.value}
            id={option.id}
            className='check-input'
          />
          <label htmlFor={option.id}>{option.label}</label>
          <br />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const FormRadioComponent = () => {
  const formatOptions = [
    { id: 'Online', value: 'Онлайн', label: 'Онлайн' },
    { id: 'Offline', value: 'Офлайн', label: 'Офлайн' },
    { id: 'Mixed', value: 'Змішано', label: 'Змішано' },
  ];

  const paymentOptions = [
    { id: 'Paid', value: 'Платно', label: 'Платно' },
    { id: 'Free', value: 'Безкоштовно', label: 'Безкоштовно' },
  ];

  const typeOptions = [
    { id: 'Webinar', value: 'Вебінар', label: 'Вебінар' },
    { id: 'Competition', value: 'Змагання', label: 'Змагання' },
    { id: 'Optional', value: 'Факультатив', label: 'Факультатив' },
    { id: 'Discussion', value: 'Дискусія', label: 'Дискусія' },
    { id: 'Circle', value: 'Гурток', label: 'Гурток' },
    { id: 'Other', value: 'Інше', label: 'Інше' },
  ];

  return (
    <div>
      <RadioGroup title="Формат" name="format" options={formatOptions} />
      <RadioGroup title="Оплата" name="payment" options={paymentOptions} />
      <RadioGroup title="Тип" name="type" options={typeOptions} />
    </div>
  );
};

export default FormRadioComponent;

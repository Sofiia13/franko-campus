import React from 'react'
import FormRadioComponent from '../components/FormRadioComponent'; 
import CardsGalleryComponent from '../components/CardsGalleryComponent';

function SearchResultsPage() {
  return (
    <div className='search-content'>
        <section className='search-filter'>
            <FormRadioComponent />
            <button className='submit-button'>Застосувати фільтри</button>
        </section>
        <section className="search-results">
            <h2 className="section-title">Результати пошуку</h2>
            <CardsGalleryComponent />
        </section>
    </div>
  )
}

export default SearchResultsPage;
import React from 'react'
import './DogCard.css'

function DogCard({ dog, isFavorite, onToggleFavorite }) {
    return (
        <li className='dog-card' key={dog.id} >
            <div>
                <strong>{dog.name}</strong>, {dog.age}
            </div>
            <br></br>
            <img src={dog.img} alt={dog.name}></img>
            
            <div>Breed: {dog.breed}</div>
            <div>Zip Code: {dog.zip_code}</div>
            <button 
                className={isFavorite ? 'favorite-button active' : 'favorite-button'}
                onClick={() => onToggleFavorite(dog.id)} 
            >
                {isFavorite
                    ? "Favorite <3"
                    : "Add to Favorites"}
            </button>
        </li>
    )
}

export default DogCard
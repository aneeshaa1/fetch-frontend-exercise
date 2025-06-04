import React from 'react'

function DogCard({ dog, isFavorite, onToggleFavorite }) {
    return (
        <li key={dog.id} >
            <img src={dog.img} alt={dog.name}></img>
            <div>
                <strong>{dog.name}</strong> ({dog.breed})
            </div>
            <div>Age: {dog.age}</div>
            <div>Zip Code: {dog.zipe_code}</div>
            <button onClick={() => onToggleFavorite(dog.id)} >
                {isFavorite
                    ? "Unfavorite </3"
                    : "Favorite <3"}
            </button>
        </li>
    )
}

export default DogCard
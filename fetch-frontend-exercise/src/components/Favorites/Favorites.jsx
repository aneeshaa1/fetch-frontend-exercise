import React, {useEffect, useState} from "react"
import DogCard  from "../DogCard/DogCard";

function Favorites({dogIds, favoritesIds, setFavoritesIds}) {

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        if (dogIds.length === 0)
            return;

        fetch('https://frontend-take-home-service.fetch.com/dogs', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dogIds),
        })
            .then((res) => res.json())
            .then((data) => setDogs(data));
    }, [dogIds]);

    const toggleFavorite = (dogId) => {
        setFavoritesIds((prev) =>
            prev.includes(dogId)
                ? prev.filter((id) => id !== dogId)
                : [...prev, dogId]
        );
    };

    return(
        <ul>
            {dogs.map((dog) => (
                <DogCard
                    key={dog.id}
                    dog={dog}
                    isFavorite={favoritesIds.includes(dog.id)}
                    onToggleFavorite={toggleFavorite}
                />
            ))}
        </ul>
    )
}

export default Favorites
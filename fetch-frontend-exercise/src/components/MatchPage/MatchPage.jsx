import React, { useState } from "react"
import Favorites from "../Favorites/Favorites"
import './MatchPage.css'
import { useNavigate } from "react-router-dom";
import DogCard from "../DogCard/DogCard";

function MatchPage({ favoritesIds, setFavoritesIds}) {

    const [matchedDog, setMatchedDog] = useState(null);
    const navigate = useNavigate();

    const toggleFavorite = (dogId) => {
        setFavoritesIds((prev) =>
          prev.includes(dogId)
            ? prev.filter((id) => id !== dogId)
            : [...prev, dogId]
        );
    };

    const handleMatch = () => {
        fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favoritesIds),
        })
            .then(res => res.json())
            .then(data => {
                const matchId = data.match;
                return fetch('https://frontend-take-home-service.fetch.com/dogs', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([matchId]),
                });
            })
            .then(res => res.json())
            .then(dogs => setMatchedDog(dogs[0]));
    }

    return(
        <div className="match-page">

            <div className="match-header">
                <h1>Match Page</h1>

                <button onClick={() => navigate('/browse')} >Back to Browse</button>
            </div>



            {favoritesIds.length === 0 
                ? (
                    <p>You don't have any favorites yet! Go back and favorite at least 1 dog so you can generate a match!</p>
                ) 
                : (
                    <>
                        <button onClick={handleMatch}>
                            Generate Match
                        </button>

                        {matchedDog && (
                            <div className="match-result">
                                <h3>Your Match:</h3>
                                <ul>
                                    <DogCard
                                        dog={matchedDog}
                                        isFavorite={favoritesIds.includes(matchedDog.id)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                </ul>
                            </div>
                        )}

                        <h2>Favorites:</h2>
                
                        <Favorites
                            dogIds={favoritesIds}
                            favoritesIds={favoritesIds}
                            setFavoritesIds={setFavoritesIds}
                        />
                        
                    </>
                )
            }

            

        </div>
    )
}

export default MatchPage
import React, { useState } from "react"
import Favorites from "../Favorites/Favorites"

function MatchPage({ favoritesIds}) {

    const [matchedDog, setMatchedDog] = useState(null);

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
        <div>
            <h1>Match Page</h1>

            {favoritesIds.length === 0 
                ? (
                    <p>You don't have any favorites yet! Go back and favorite at least 1 dog so you can generate a match!</p>
                ) 
                : (
                    <>
                        <Favorites dogIds={favoritesIds} />
                        <button onClick={handleMatch}>
                            Generate Match
                        </button>
                    </>
                )
            }

            {matchedDog && (
                <div>
                    <h3>Your Match 🐾</h3>
                    <img src={matchedDog.img} alt={matchedDog.name}/>
                    <div>
                        <strong>{matchedDog.name}</strong> ({matchedDog.breed})
                    </div>
                    <div>Age: {matchedDog.age}</div>
                    <div>Zip Code: {matchedDog.zip_code}</div>
                </div>
            )}

        </div>
    )
}

export default MatchPage
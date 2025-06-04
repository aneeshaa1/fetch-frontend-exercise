import React, {useEffect, useState} from "react"

function Favorites({dogIds}) {

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

    return(
        <ul>
            {dogs.map((dog) => (
                <li key={dog.id}>
                    <img src={dog.img} alt={dog.name} />
                    <div>
                        <strong>{dog.name}</strong> ({dog.breed})
                    </div>
                    <div>Age: {dog.age}</div>
                    <div>Zip Code: {dog.zip_code}</div>
                </li>
            ))}
        </ul>
    )
}

export default Favorites
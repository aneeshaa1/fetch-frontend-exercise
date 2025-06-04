import React, {useState, useEffect} from "react"
import Filters from "../Filters/Filters"

function BrowsePage() {

    const [breeds, setBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [dogIds, setDogIds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const [sortField, setSortField] = useState('breed');
    const [sortOrder, setSortOrder] = useState('asc');
    const [favoritesIds, setFavoritesIds] = useState([]);

    useEffect(() => {
        fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        method: 'GET',
        credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => setBreeds(data));
    }, []);

    useEffect(() => {
        if (selectedBreeds.length === 0) return;
        handleSearch();
    }, [selectedBreeds, page, sortField, sortOrder]);

    useEffect(() => {
        setPage(0);
    }, [selectedBreeds]);

    const handleSearch = () => {
        const breedParams = selectedBreeds.map((b) => `breeds=${encodeURIComponent(b)}`).join('&');
        const sortParam = `sort=${sortField}:${sortOrder}`;

        fetch(
        `https://frontend-take-home-service.fetch.com/dogs/search?${breedParams}&${sortParam}&size=${pageSize}&from=${
            page * pageSize
        }`,
        {
            method: 'GET',
            credentials: 'include',
        }
        )
        .then((res) => res.json())
        .then((data) => {
            setDogIds(data.resultIds);
            return fetch('https://frontend-take-home-service.fetch.com/dogs', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.resultIds),
            });
        })
        .then((res) => res.json())
        .then(setDogs);
    };

    const toggleFavorite = (dogId) => {
        setFavoritesIds((prev) =>
            prev.includes(dogId)
                ? prev.filter((id) => id !== dogId)
                : [...prev, dogId]
        );
    };

    return (
        <div>
            <h2>Dog Search</h2>

            <Filters
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                onSelectedBreedsChange={setSelectedBreeds}
                sortField={sortField}
                sortOrder={sortOrder}
                onSortFieldChange={setSortField}
                onSortOrderChange={setSortOrder}
            />

            {/* displayed dogs */}
            <ul>
                {dogs.map((dog) => (
                <li key={dog.id}>
                    <img src={dog.img} alt={dog.name} />
                    <div>
                    <strong>{dog.name}</strong> ({dog.breed})
                    </div>
                    <div>Age: {dog.age}</div>
                    <div>Zip Code: {dog.zip_code}</div>

                    <button onClick={() => toggleFavorite(dog.id)} >
                        {favoritesIds.includes(dog.id)
                            ? 'Unfavorite </3'
                            : 'Favorite <3'
                        }
                    </button>
                </li>
                ))}
            </ul>
            
            {/* page navigation */}
            <div>
                <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                    Previous
                </button>
                <span>
                    Page {page + 1}
                </span>
                <button onClick={() => setPage((p) => p + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default BrowsePage
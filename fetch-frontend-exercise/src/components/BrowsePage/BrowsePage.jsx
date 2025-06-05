import React, {useState, useEffect} from "react"
import Filters from "../Filters/Filters"
import DogCard from "../DogCard/DogCard";
import './BrowsePage.css'
import { useNavigate } from "react-router-dom";

function BrowsePage({ favoritesIds, setFavoritesIds }) {

    const [breeds, setBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [dogIds, setDogIds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [page, setPage] = useState(0);
    const pageSize = 20;
    const [sortField, setSortField] = useState('breed');
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

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
        <div className="browse-page">

            <div className="browse-header">
                <h1>Dog Search</h1>

                <button onClick={() => {navigate('/match')}} >
                    Find A Match
                </button>
            </div>



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
                    <DogCard
                        key={dog.id}
                        dog={dog}
                        isFavorite={favoritesIds.includes(dog.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </ul>
            
            {/* page navigation */}
            <div className="page-btn">
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
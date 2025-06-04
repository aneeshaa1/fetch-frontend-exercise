import React from "react"
import './Filters.css'

function Filters({
    breeds, 
    selectedBreeds, 
    onSelectedBreedsChange, 
    sortField, 
    sortOrder, 
    onSortFieldChange, 
    onSortOrderChange
})  {

    // update selected breeds
    const handleBreedChange = (e) => {
        const value = e.target.value;
        onSelectedBreedsChange((prev) => 
            e.target.checked 
                ? [...prev, value] 
                : prev.filter((b) => b !== value)
        );
    };

    return (
        <div className="filters-sidebar">
            <h2>Filters</h2>

            <div className="sort-controls">
                <label>
                    <strong>Sort By:</strong>
                    <select value={sortField} onChange={(e) => onSortFieldChange(e.target.value)}>
                        <option value="breed">Breed</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                    </select>
                </label>

                <label>
                    <strong>Order:</strong>
                    <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

            <h4>Select Breeds:</h4>

            <div className="breed-list">
                {breeds.map((breed) => (
                    <label key={breed}>
                        <input
                            type="checkbox"
                            value={breed}
                            checked={selectedBreeds.includes(breed)}
                            onChange={handleBreedChange}
                        />
                        {breed}
                    </label>
                ))}
            </div>


        </div>
    );
}

export default Filters
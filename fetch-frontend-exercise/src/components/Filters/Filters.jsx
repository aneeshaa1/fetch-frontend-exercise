import React from "react"

function Filters({
    breeds, 
    selectedBreeds, 
    onSelectedBreedsChange, 
    sortField, 
    sortOrder, 
    onSortFieldChange, 
    onSortOrderChange
})  {

    const handleBreedChange = (e) => {
        const value = e.target.value;
        onSelectedBreedsChange((prev) => 
            e.target.checked ? [...prev, value] : prev.filter((b) => b !== value)
        );
    };

    return (
        <div>
            <h2>Filters</h2>

            <h4>Select Breeds:</h4>

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

            <div>
                <label>
                    Sort By:&nbsp;
                    <select value={sortField} onChange={(e) => onSortFieldChange(e.target.value)}>
                        <option value="breed">Breed</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                    </select>
                </label>

                <label>
                    Order:&nbsp;
                    <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>

        </div>
    );
}

export default Filters
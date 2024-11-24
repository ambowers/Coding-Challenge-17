import React, { useState, useEffect } from 'react';

function Gallery({ tourType }) {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://course-api.com/react-tours-project?type=${tourType}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                setTours(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [tourType]); // Runs whenever `tourType` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Tours {tourType ? `of type: ${tourType}` : ''}</h2>
            {tours.map((tour) => (
                <div key={tour.id}>
                    <h3>{tour.name}</h3>
                    <img src={tour.image} alt={tour.name} />
                    <p>{tour.info}</p>
                    <p>Price: ${tour.price}</p>
                    <button onClick={() => setTours(tours.filter((t) => t.id !== tour.id))}>
                        Not Interested
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Gallery;

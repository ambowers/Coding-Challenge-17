import React, { useState, useEffect } from 'react';

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        //Fetch tour data from the API 
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTours(data); // Set state with the fetched tours
        setLoading(false); // Turn off loading spinner
      } catch (err) {
        setError(err); // Set error state
        setLoading(false); // Stop loading even if error occurs
      }
    };

    fetchTours();
  }, []); 
//Display a loading message while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }
//Handle and display an error message if the fetch fails
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };
  //Add a "Not Interested" button to remove a tour from the list.
  return (
    <div className="container">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h3>{tour.name}</h3>
          <p>{tour.info}</p>
          <p className="price">${tour.price}</p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Showart() {
  const [art, setArts] = useState([]);

  useEffect(() => {
    // Fetch the data from your server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getarts');
        if (response.status === 200) {
          setArts(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Art List</h1>
      <ul>
        {art.map((item) => (
          <li key={item._id}>
            <strong>Name:</strong> {item.name}
            <br />
            <strong>Description:</strong> {item.description}
            <br />
            <strong>Image URL:</strong> {item.imageUrl}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Showart;

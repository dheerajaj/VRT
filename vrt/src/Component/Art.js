
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

function Art() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/art', formData);
      if (response.status === 201) {
        alert('Art saved successfully!');
        setFormData({ name: '', description: '', imageUrl: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save the item. Please try again.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Add an Art</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Art;

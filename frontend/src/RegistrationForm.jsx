import React, { useState, useRef } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photo: null
  });

  // Create a ref for the file input
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle success (e.g., display a success message or redirect)
    } catch (error) {
      console.error(error.response.data);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-5 max-w-md mx-auto my-10 space-y-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
        className="p-2 border rounded shadow-sm"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
        className="p-2 border rounded shadow-sm"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="p-2 border rounded shadow-sm"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        className="p-2 border rounded shadow-sm"
        required
      />
      <input
        ref={fileInputRef}
        type="file"
        name="photo"
        onChange={handleFileChange}
        className="p-2 border rounded shadow-sm"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
    </form>
  );
};

export default RegistrationForm;

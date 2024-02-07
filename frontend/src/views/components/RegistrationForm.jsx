import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import UserDelete from './UserDelete';
import UserLogin from './UserLogin';
import UserEdit from './UserEdit';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    photo: null
  });


  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [showLogin, setShowLogin] = useState(false); // State to manage the visibility of UserLogin component

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


  const handleCheckEmail = async () => {
    try {
      // Make a request to check if the email already exists
      const response = await axios.get(`http://localhost:5000/api/users/checkEmail/${formData.email}`);
      console.log(response.data);

      // Handle the response as needed, showing a message or taking appropriate action
      if (response.data.exists) {
        setRegistrationStatus('error');
        // Set a message indicating that the email already exists
      } else {
        setRegistrationStatus('success');
        // Set a message indicating that the email is available
      }
    } catch (error) {
      console.error(error.response.data);
      setRegistrationStatus('error');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('role',formData.role);
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
        // Handle success
       await handleCheckEmail();
        setRegistrationStatus('success')
        setTimeout(()=>{  
          setRegistrationStatus(null);
        },5000);
       
        setShowLogin(true); // Set showLogin to true after successful registration
    } catch (error) {
      console.error(error.response.data);
      // Handle error (e.g., display an error message)
         // Handle error
         setRegistrationStatus('error');
         setTimeout(()=>{  
          setRegistrationStatus(null);
        },5000)

    }
  };




   
  

  return (
     <>

{registrationStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Email already exists.</span>
          </div>
        )}

    {registrationStatus === 'success' && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> Registration successful.</span>
      </div>
    )}

    {registrationStatus === 'error' && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Registration failed. Please try again.</span>
      </div>
    )}



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
       
       <select
       type="text"
  name="role"
  value={formData.role}
  onChange={handleInputChange}
  className='p-2 border rounded shadow-sm'
  required
>
  <option value="">Select Role</option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="tenant">Tenant</option>
  <option value="landlord">Landlord</option>
</select>


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
     
  <div className=" ">
    <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
    {/*showLogin && <UserLogin />*/} {/* Render UserLogin component conditionally */}
   
  </div>
    
    </form>

    </>
  );
};

export default RegistrationForm;

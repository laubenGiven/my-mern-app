import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    photo: null,
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const fileInputRef = useRef();

  // Add a ref to store the current timeout to clear it on unmount
  const timeoutRef = useRef();

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setMessageWithTimeout = (type, duration = 5000) => {
    setRegistrationStatus(type);
    // Clear the existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setRegistrationStatus(null);
    }, duration);
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
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






  const handleRegistration = async (e) => {
    e.preventDefault();
    await handleCheckEmail(); // Check email availability before attempting registration

    // Add password validation logic if needed
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch error
      setRegistrationStatus('error');
      setTimeout(() => {
        setRegistrationStatus(null);
      }, 5000);
      return;
    }

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('role', formData.role);
    data.append('password', formData.password);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setMessageWithTimeout('success');
    } catch (error) {
      console.error(error.response.data);

      // Handle error
      setMessageWithTimeout('error');
    }
  };

  return (
    <>
      
      {registrationStatus === 'success' && (
        <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Registration successful.</span>
        </div>
      )}

      {registrationStatus === 'error' && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Registration failed. Please try again.</span> {/* Adjust message as needed */}
        </div>
      )}
      <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Signup For Free
      </h2>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" onSubmit={handleRegistration}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-white">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-white">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-1.5 text-slate-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-slate-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-white">
              Role
            </label>
            <select
             id="role" 
  name="role"
  value={formData.role}
  onChange={handleInputChange}
  className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  required
>
  <option value="" disabled hidden>Select Role</option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
  <option value="tenant">Tenant</option>
  <option value="landlord">Landlord</option>
</select>


          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-slate-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-white ">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 py-1.5 text-slate-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
              Profile Photo
            </label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="block w-full rounded-1 border-0 py-1.5 px-2 text-slate-900 bg-gray-500 shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>



        <p className="mt-4 text-center text-sm text-gray-200">
          Already a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-200 hover:text-indigo-500">
            Login
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUp;

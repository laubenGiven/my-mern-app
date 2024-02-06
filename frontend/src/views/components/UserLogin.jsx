import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginStatus, setLoginStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      setLoginStatus('success');

      // Set login status to true if the login is successful
      setLoggedIn(true);

      // Automatically hide the success message after 5 seconds
      setTimeout(() => {
        setLoginStatus(null);
      }, 5000);
    } catch (error) {
      console.error(error.response.data);
      setLoginStatus('error');

      // Automatically hide the error message after 5 seconds
      setTimeout(() => {
        setLoginStatus(null);
      }, 5000);

      // Set login status to false if login fails
      setLoggedIn(false);
    }
  };

  return (
    <div>
      {loginStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Login successful.</span>
        </div>
      )}

      {loginStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Login failed. Please check your credentials and try again.</span>
        </div>
      )}

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
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Login
      </button>
    </div>
  );
};

export default UserLogin;


<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-700" >
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <img
    className="mx-auto h-10 w-auto"
    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    alt="Your Company"
  />
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
    Sign in to your account
  </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" action="#" method="POST">
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
          Password
        </label>
        <div className="text-sm">
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </div>
  </form>

  <p className="mt-10 text-center text-sm text-gray-200">
    Not a member?{' '}
    <a href="#" className="font-semibold leading-6 text-indigo-200 hover:text-indigo-500">
     Register
    </a>
  </p>
</div>
</div>

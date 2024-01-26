import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import RegistrationForm from "./RegistrationForm";

function App() {
  return (
    <>
      <span> Subscribe Alien Technologies code </span>
      <Header />
      <h1>Registration Form</h1>
      <RegistrationForm />
      
    </>
  );
}

export default App;

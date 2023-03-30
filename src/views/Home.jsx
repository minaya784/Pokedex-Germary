import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import '../views/Home.css';

const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z ]{2,}$/.test(newNameValue))
      setNameError('Only letters and blanks are allowed and least should be 3 length');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <>
      <nav className="navbar__container">
        <div className="pokemon__background"></div>
        <div className="logo">
          <div>
            <img src="/pokedex-img.png" alt="Pokedex" className="img-logo" />
          </div>
          <div className="text-center">
            <h1 className="tittle">¡Hello Trainer!</h1>
            <p>Type your name to start</p>
          </div>
          <form className="form__container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input__search"
              value={nameValue}
              onChange={handleChange}
            />
            <button type="submit" className="botton__start">
              Start
            </button>
          </form>
          {nameError && <p className="text-red-500 text-center">{nameError}</p>}

          {user && <Navigate to="/pokedex" replace />}
        </div>
      </nav>
    </>
  );
};

export default Home;

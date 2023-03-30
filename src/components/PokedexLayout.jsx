import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import '../views/Pokedex.css';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);

  return (
    <div className="container__logout">
      <button className="logout" onClick={removeUser}>
        Log out
      </button>
      <Outlet />
    </div>
  );
};

export default PokedexLayout;

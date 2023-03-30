import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { Form } from 'react-router-dom';
import '../views/Pokedex.css';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 55);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="pokedex__container">
      <div className="tittle__pokedex">
        <p className="welcome">
          <span>
            Bienvenido <strong>{user}</strong>,{' '}
          </span>
        </p>
        <p>Aqui podras encontrar tu pokemon favorito.</p>
      </div>

      <div className="container__page">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={
              pokemonsPagination.currentPage === page ? 'text-red-500' : 'page__number'
            }
          >
            {' '}
            {page}
          </button>
        ))}
      </div>

      <div>
        <Form className="filter__form__pokedex">
          <h3 className="filter">Filter for search</h3>
          <div className="pokemon__input__container">
            <input
              type="text"
              name="pokemon_name"
              className="input__search__pokedex"
              value={pokemonName}
              onChange={handleNameChange}
            />
            <select
              className="choose"
              name="pokemon_type"
              value={pokemonType}
              onChange={handleTypeChange}
            >
              <option value="">All</option>
              {types.map((type) => (
                <option key={type.url} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <button className="btn__search" type="submit">
              Search
            </button>
          </div>
        </Form>
      </div>

      <section className="pokemon__card__pokedex">
        {pokemonsPagination.listSlice.length ? (
          pokemonsPagination.listSlice.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonData={pokemon} />
          ))
        ) : (
          <p>
            No hay pokemons de tipo "{pokemonType}" y con el nombre "{pokemonName}"
          </p>
        )}
      </section>
    </div>
  );
};

export default Pokedex;

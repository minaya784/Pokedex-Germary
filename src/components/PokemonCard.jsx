import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../views/Pokedex.css';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);

      setPokemon(pokemonInfo);
    };

    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article onClick={handleClickNavigate} className="hover:cursor-pointer">
          <div
            className={
              pokemon.types[0].type.name === 'fire'
                ? 'Fuego'
                : pokemon.types[0].type.name === 'water'
                ? 'Agua'
                : pokemon.types[0].type.name === 'grass'
                ? 'Hierba'
                : pokemon.types[0].type.name === 'electric'
                ? 'Electrico'
                : pokemon.types[0].type.name === 'ice'
                ? 'Hielo'
                : pokemon.types[0].type.name === 'poison'
                ? 'Poison'
                : pokemon.types[0].type.name === 'ground'
                ? 'Ground'
                : pokemon.types[0].type.name === 'rock'
                ? 'Rock'
                : pokemon.types[0].type.name === 'ghost'
                ? 'Ghost'
                : pokemon.types[0].type.name === 'steel'
                ? 'Steel'
                : pokemon.types[0].type.name === 'psichic'
                ? 'Psichic'
                : pokemon.types[0].type.name === 'figthing'
                ? 'Figthing'
                : pokemon.types[0].type.name === 'bug'
                ? 'Bug'
                : 'normal'
            }
          >
            <div className="pokemon__card">
              <section className="img__header">
                <header>
                  <div>
                    <img
                      src={pokemon?.sprites.other['official-artwork'].front_default}
                      alt={pokemon.name}
                    />
                  </div>
                </header>
              </section>
              <div className="data__container">
                <h2 className="name_pokemon">
                  {' '}
                  <strong> {pokemon.name} </strong>
                </h2>
                <p className="pokemon__type">{pokemon.types[0].type.name}</p>

                <section className="stats__container">
                  {pokemon.stats.map((stat) => (
                    <section key={stat.stat.name}>
                      <h3>{stat.stat.name.toUpperCase()}</h3>
                      <p>{stat.base_stat}</p>
                    </section>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default PokemonCard;

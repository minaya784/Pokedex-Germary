import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../views/PokemonDetail.css';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <div>
      {pokemon && (
        <>
          <div className="container__background"></div>
          <div className="container__data">
            <img
              className="container__img"
              src={pokemon?.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="container__info">
            <h1 className='pokemon__id'>#{pokemon.id}</h1>
            <h2 className="pokemon__name">{pokemon.name}</h2>
            <div className="container__description">
              <div>
                <h2>Peso </h2>
                <h3> {pokemon?.weight}</h3>
              </div>
              <div>
                <h2>Altura</h2>
                <h3>{pokemon?.height}</h3>
              </div>
            </div>
          </div>
          <div>
            <div className="container__type__ability">
              <div className="container__type">
                <h2>Tipo</h2>
                <div>
                  <h2 className="type"> {pokemon?.types[0].type.name}</h2>
                </div>
              </div>
              <div className="container__ability">
                <h2>Habilidades</h2>
                <div>
                  <h2 className="ability">
                    {pokemon?.abilities.map((ability) => ability.ability.name)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="container__stats">
              <h2 className="stats__title">Stats</h2>
              <section className="stats">
                {pokemon.stats.map((stat) => (
                  <>
                    <section key={stat.stat.name} className="stats__data">
                      <h3>{stat.stat.name.toUpperCase()} </h3>

                      <p>
                        {stat.base_stat} <span>/150</span>{' '}
                      </p>
                    </section>
                    <div className="stats__bar">
                      <div className="stats__bar__son"></div>
                    </div>
                  </>
                ))}
              </section>
            </div>
            <div className="moves__container">
              <h2 className="title__moves">Movesments </h2>
              <section className="moves">
                {pokemon.moves.map((move) => (
                  <section key={move.move.name} className="moves__data">
                    <h3 className="text__moves">{move.move.name.toUpperCase()}</h3>
                  </section>
                ))}
              </section>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;

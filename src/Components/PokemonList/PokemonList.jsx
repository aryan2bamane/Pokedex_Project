import axios from "axios";
import { useEffect, useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
import "./PokemonList.css";
function PokemonList() {
  const [stateList, setstateList] = useState({
    pokemonList: [],
    isLoading: false,
    PokedexURL: "https://pokeapi.co/api/v2/pokemon",
    PrevUrl: "",
    nextUrl: "",
  });

  async function getPokemon() {
    setstateList((allstate) => ({ ...allstate, isLoading: true }));
    const response = await axios.get(stateList.PokedexURL);

    const PokemonResults = response.data.results;

    setstateList((allStates) => ({
      ...allStates,
      nextUrl: response.data.next,
      PrevUrl: response.data.previous,
    }));

    const PokemonResultPromise = PokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    const pokemonData = await axios.all(PokemonResultPromise);
    // console.log(pokemonData);
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.other.dream_world.front_shiny,
        type: pokemon.type,
      };
    });

    setstateList((allStates) => ({
      ...allStates,
      pokemonList: pokeListResult,
      isLoading: false,
    }));

    console.log(PokemonResults);
  }
  useEffect(() => {
    getPokemon();
  }, [stateList.PokedexURL]);

  return (
    <div className="page">
      <div className="pokemon_wrapper">
        {stateList.isLoading
          ? "Loading..."
          : stateList.pokemonList.map((p) => (
              <Pokemons name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={stateList.PrevUrl == null}
          onClick={() => {
            const urlToSet = stateList.PrevUrl;
            setstateList({ ...stateList, PokedexURL: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={stateList.nextUrl == null}
          onClick={() => {
            const urlToSet = stateList.nextUrl;
            setstateList({ ...stateList, PokedexURL: urlToSet });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;

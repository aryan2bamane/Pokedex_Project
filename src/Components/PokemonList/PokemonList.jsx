import axios from "axios";
import { useEffect, useState } from "react";
import Pokemons from "../Pokemons/Pokemons";
import "./PokemonList.css";
function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [PokedexURL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");//URL for pokedex data
    const [PrevUrl, setprevUrl] = useState("");
    const [nextUrl, setnextUrl] = useState("");

    async function getPokemon() {

        const response = await axios.get(PokedexURL);

        setIsLoading(false);

        const PokemonResults = response.data.results;
        setnextUrl(response.data.next);
        setprevUrl(response.data.previous);

        const PokemonResultPromise = PokemonResults.map((pokemon) => axios.get(pokemon.url));

        const pokemonData = await axios.all(PokemonResultPromise);
        console.log(pokemonData);
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.other.dream_world.front_shiny,
                type: pokemon.type

            }
        });
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }
    useEffect(() => {
        getPokemon();
    }, [PokedexURL])


    return (
        <div className="page">
            <div className="pokemon_wrapper">
                {(isLoading) ? 'Loading...' :
                    pokemonList.map((p) => <Pokemons name={p.name} image={p.image} key={p.id} />
                    )
                }
            </div>
            <div className="controls">
                <button disabled={PrevUrl == null} onClick={() => setPokedexURL(PrevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => setPokedexURL(nextUrl)}> Next</button>
            </div>
        </div>


    )
}

export default PokemonList;
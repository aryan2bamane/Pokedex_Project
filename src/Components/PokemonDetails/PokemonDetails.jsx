import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
function PokemonDetails() {

    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    async function loadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        }
        )
    }
    useEffect(() => {
        loadPokemon();
    }, [])

    return (
        <div className="details_wrapper">
            <img src={pokemon.image} alt="" />
            <span className="pokemon_name">{pokemon.name}</span>
            <span className="pokemon_height">Height: {pokemon.height}</span>
            <span className="pokemon_weight">Weight: {pokemon.weight}</span>
            <div className="pokemon_types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
        </div>
    )
}

export default PokemonDetails;
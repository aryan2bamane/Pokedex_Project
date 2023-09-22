import { Link } from "react-router-dom"
import "./Pokemon.css"
function Pokemons({ name, image ,id}) {

    return (
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>
            <div>{name}</div>
            <img src={image} alt="" />
            </Link>
        </div>
    )
}

export default Pokemons
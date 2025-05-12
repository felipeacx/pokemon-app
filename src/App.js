import "./styles.css";
import { pokeData } from "./data";
import { useEffect, useState, useMemo } from "react";
/*
Todo:
 
1.- display the pokemon on the json as a list
2.- make a service simulating a request using a promise for retrieve the list of pokemon
3.- add a search input to filter the pokemon by className
4.- add a checkbox to mark the pokemon as registered
5.- hide the registered pokemon from the list
6.- add a button to mark all the pokemon as unregistered
*/

export default function App() {
  const [data, setData] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [search, setSearch] = useState("");
  const getData = () => {
    return new Promise((resolve, reject) => resolve(pokeData));
  };
  async function getDataPokemons() {
    const pokemons = await getData();
    setData(pokemons);
  }
  useEffect(() => {
    getDataPokemons();
  }, []);

  const filterPokemons = useMemo(() => {
    return data.filter(
      (poke) => !registered.includes(poke.name) && poke.name.includes(search)
    );
  }, [data, registered, search]);

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <ul>
        {filterPokemons &&
          filterPokemons.map((pokemon, index) => (
            <li key={index}>
              <input
                type="checkbox"
                onClick={() => setRegistered([...registered, pokemon.name])}
                checked={registered.includes(pokemon.name)}
              />
              {pokemon.name}
            </li>
          ))}
      </ul>
      <button onClick={() => setRegistered([])}>
        Mark all as unregistered
      </button>
    </div>
  );
}

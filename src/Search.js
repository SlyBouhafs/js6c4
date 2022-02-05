import React from "react";
import { search } from "./Helpers.js";

const Search = ({ setPokemonValue }) => {
  const [pokemonList, setPokemonList] = React.useState([]);
  return (
    <div>
      <input
        onChange={async (e) => {
          const query = e.target.value;
          if (query.length < 3) return;
          const result = await search(query);
          setPokemonList(result);
        }}
      />
      <hr />
      {pokemonList.map((p) => {
        return (
          <div
            className="pokemonList"
            onClick={(e) => {
              const value = e.target.innerText;
              setPokemonValue(value);
            }}
          >
            {p.name}
          </div>
        );
      })}
    </div>
  );
};

export default Search;

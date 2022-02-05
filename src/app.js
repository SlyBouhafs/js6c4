import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search.js";
import Pokemon from "./Pokemon.js";

const App = () => {
  const [pokemonValue, setPokemonValue] = React.useState("");
  console.log(pokemonValue);
  return (
    <div>
      {pokemonValue ? (
        <Pokemon pokemonValue={pokemonValue} />
      ) : (
        <Search
          setPokemonValue={(arg) => {
            setPokemonValue(arg);
          }}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

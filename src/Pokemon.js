import React from "react";
import {
  getPokemon,
  getLessons,
  getUser,
  login,
  enroll,
  unenroll,
} from "./Helpers.js";

const Button = ({ isLoggedIn, pokemonData, setIsLoggedIn, setPokemonData }) => {
  if (isLoggedIn) {
    return "";
  } else {
    return (
      <button
        onClick={async () => {
          const result = await login(pokemonData.name);
          setPokemonData(result);
          setIsLoggedIn(true);
        }}
      >
        Login
      </button>
    );
  }
};

const Lessons = ({ isLoggedIn }) => {
  const [lessons, setLessons] = React.useState([]);
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const result = await getUser();
      setUserData(result);
    };
    fetchPokemon();

    const fetchLessons = async () => {
      const result = await getLessons();
      setLessons(result);
    };
    fetchLessons();
    console.log(lessons);
    console.log(userData)
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <div>
        <h2>Enrolled </h2>
        <ul>
          {userData
            ? userData.lessons.map((lesson) => {
                <li
                  onClick={async (e) => {
                    const value = e.target.innerText;
                    unenroll(value);
                  }}
                >
                  {lesson.slug}
                </li>;
              })
            : ""}
        </ul>
        <h2> Not Enrolled </h2>
        <ul>
          {userData
            ? lessons.map((lesson) => {
                <li
                  onClick={(e) => {
                    const value = e.target.innerText;
                    enroll(value);
                  }}
                >
                  {userData.lessons[lesson.slug] ? "" : lesson.slug}
                </li>;
              })
            : ""}
        </ul>
      </div>
    );
  }

  return "";
};

const Pokemon = ({ pokemonValue }) => {
  const [pokemonData, setPokemonData] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const result = await getPokemon(pokemonValue);
      setPokemonData(result);
    };
    fetchPokemon();
  }, [pokemonValue]);

  return (
    <div>
      <h2>{pokemonData.name}</h2>
      <img src={pokemonData.image} />
      <Button
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={(arg) => {
          setIsLoggedIn(arg);
        }}
        pokemonData={pokemonData}
        setPokemonData={(arg) => {
          setPokemonData(arg);
        }}
      />
      <Lessons isLoggedIn={isLoggedIn} pokemonValue={pokemonValue} />
    </div>
  );
};

export default Pokemon;

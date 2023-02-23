import React from "react";
import { useState } from "react";

const Jokes = () => {
  const generateJokes = async () => {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const { value } = await response.json();
      setJoke(value);
    } catch (e) {
      console.log(e);
    }
  };
  const [joke, setJoke] = useState("");

  return (
    <div>
      <h1>Jokes Generator</h1>
      <p>{joke}</p>
      <button onClick={generateJokes}>Generate Joke </button>
    </div>
  );
};

export default Jokes;

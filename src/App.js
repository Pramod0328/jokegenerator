import { useState, useEffect } from 'react';
import './styles.css';
import { useFetch } from './useFetch'; // Import the custom hook

export default function App() {
  const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
  const { data, loading, error, getJoke } = useFetch(url); // Using the custom hook

  useEffect(() => {
    getJoke(); // Automatically fetch a joke when the component mounts
  }, []); // Empty dependency array to execute once on mount

  return (
    <div className="App">
      <h1>Joke Generator</h1>
      {loading && !error && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && <h2>{data}</h2>}
      <button className="btn" onClick={getJoke} disabled={loading}>New Joke</button>
    </div>
  );
}

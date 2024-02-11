import { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  const url = "https://v2.jokeapi.dev/joke/Programming?type=single";
  const { data, loading, error, getJoke } = useFetch(url);

  return (
    <div className="App">
      <h1>Joke Generator</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && <h2>{data}</h2>}
      <button className="btn" onClick={getJoke}>New Joke</button>
    </div>
  );
}

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const jokeData = await response.json();
      setData(jokeData.joke);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getJoke();
  }, [url]);

  return { data, loading, error, getJoke };
};

export { useFetch };

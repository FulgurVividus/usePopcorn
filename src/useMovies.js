import { useState, useEffect } from "react";

const KEY = `38c94ee0`;

// use named exports for custom hooks
// NOTE: this's not a component, it's just function
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Data fetching
  useEffect(
    function () {
      //   callback?.();

      // 1. using abort controller, it's browser API
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          // 2. in order to connect abort controller with the fetch function
          // we pass in the 2nd argument
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error(`Something went wrong with fetching movies`);
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(`${data.Error}`);
          }

          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (!error.name === "AbortError") {
            console.log(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      // 3. clean up function
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  // this function must return things that are needed to make the app work
  // these are needed outside of the custom hook
  return { movies, isLoading, error };
}

import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // useState also accepts callback function and it must be pure (doesn't accept any params)
  // executed on initial render
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // setting local storage
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

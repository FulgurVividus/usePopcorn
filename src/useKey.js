import { useEffect } from "react";

// this custom hook basically doesn't return anything
export function useKey(key, action) {
  // key press event
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };

      document.addEventListener("keydown", callback);

      // clean up
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}

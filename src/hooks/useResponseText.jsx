import { useEffect } from "react";
import { useState } from "react";

export function useResponseText(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.text())
        .then((text) => {
          if (!ignore) {
            setData(text);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}

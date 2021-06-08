import { useEffect, useState } from "react"

const initialState = {};

export const useProperty = (ipfsPath) => {
  const [property, setProperty] = useState(initialState);

  useEffect(()=>{
    const fetchProperty = (url) => fetch(url)
      .then(res => res.json())
      .then((data) => setProperty(data));
    fetchProperty(ipfsPath);
  }, [ipfsPath]);

  return property;
}

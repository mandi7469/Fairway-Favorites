// disc context provider for favorites
import { createContext, useState, useContext, useEffect } from "react";

const DiscContext = createContext();

export const useDiscContext = () => useContext(DiscContext);

export const DiscProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (disc) => {
    setFavorites((prev) => [...prev, disc]);
  };

  const removeFromFavorites = (discId) => {
    setFavorites((prev) => prev.filter((disc) => disc.id !== discId));
  };

  const isFavorite = (discId) => {
    return favorites.some((disc) => disc.id === discId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <DiscContext.Provider value={value}>
    {children}
    </DiscContext.Provider>;
};

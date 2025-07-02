// disc context provider for favorites
import { createContext, useState, useContext, useEffect } from "react";

// created a new react context. This will be used to share the 'disc' related state
// and functions throughout the component tree without prop drilling
const DiscContext = createContext();

export const useDiscContext = () => useContext(DiscContext);

// discProvider component that wraps the application. Manages state for user's favorite discs
// and provides functions to interact with this state to it's children components
export const DiscProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []);

  // useEffect to load favorite discs from localStorage when the component mounts
  // this ensures that user's favorites persist across sessions
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    console.log('Loading favorites from localStorage:', storedFavs)

    // if favorites are found in localStorage, parse them and update the state
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (e){
        console.log('Error parsing favorites from localStorage:', e)
      }
    }
  }, []);

  // useEffect to save the current favorites to localStorage whenever the 'favorites' state changes
  // this keeps localStorage in sync with the application's state
  useEffect(() => {
    console.log("Saving favorites to localStorage:", favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (disc) => {
    console.log("Adding to favorites:", disc);
    setFavorites((prev) => [...prev, disc]);
  };

  const removeFromFavorites = (discId) => {
    console.log("Removing from favorites:", discId);
    setFavorites((prev) => prev.filter((disc) => disc.id !== discId));
  };

  const isFavorite = (discId) => {
    return favorites.some((disc) => disc.id === discId);
  };

  // the value object that will be provided to consumers of this context. It includes the favorites array and the functions to manipulate it.
  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  // render the DiscContext.Provider, making the 'value' available to all components rendered within its 'children'
  return <DiscContext.Provider value={value}>{children}</DiscContext.Provider>;
};

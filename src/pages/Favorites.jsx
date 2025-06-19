// imports
import { useDiscContext } from "../contexts/DiscContext";
import DiscCard from "../components/DiscCard";
import "../css/Favorites.css";

// renders the favorites page, displaying a list of discs marked as favorites. If no discs are favorited, it displays a message indicating that.
function Favorites() {
  const { favorites } = useDiscContext();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Discs Yet</h2>
        <p>Start adding discs to your favorites and they will appear here!</p>
      </div>
    );
  }
  return (
    <div className="favorites">
      <h2>Your Favorite Discs</h2>
      <div className="disc-grid"> 
        {/* maps over the favorites array and render a DiscCard for each disc */}
        {favorites.map((disc) => (
          <DiscCard disc={disc} key={disc.id} /> // pass disc data as props and use disc.id as a unique key
        ))}
      </div>
    </div>
  );
}

export default Favorites;

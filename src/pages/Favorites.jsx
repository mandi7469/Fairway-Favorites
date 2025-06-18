import { useDiscContext } from "../contexts/DiscContext";
import DiscCard from "../components/DiscCard";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useDiscContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorite Discs</h2>
        <div className="disc-grid">
          {favorites.map((disc) => (
            <DiscCard disc={disc} key={disc.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>No Favorite Discs Yet</h2>
      <p>Start adding discs to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;

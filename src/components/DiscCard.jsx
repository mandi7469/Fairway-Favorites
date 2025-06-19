// imports
import { useDiscContext } from "../contexts/DiscContext";
import "../css/DiscCard.css";

// renders a single disc card component, displays disc information and provides functionality to favorite/unfavorite a disc
function DiscCard({ disc }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useDiscContext();
  const favorite = isFavorite(disc.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(disc.id);
    else addToFavorites(disc);
  }

  return (
    <div className="disc-card">
      <div className="disc-poster">
        {/* displays the disc's picture or null if not available */}
        <img src={disc.pic || null} alt={disc.name} />
        <div className="disc-overlay">
          {/* favorite button with conditional 'active' class for styling when favorited */}
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♥︎
          </button>
        </div>
      </div>
      <div className="disc-info">
        <h3>{disc.name}</h3>
        {/* category of disc (if it is a driver, midrange, putter, etc) */}
        <h4>{disc.category}</h4>
        {/* flight numbers for disc */}
        <p>
          {disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}
        </p>
      </div>
    </div>
  );
}

export default DiscCard;

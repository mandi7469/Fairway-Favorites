import { useDiscContext } from "../contexts/DiscContext";
import "../css/DiscCard.css";

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
        <img src={disc.pic || null} alt={disc.name} />
        <div className="disc-overlay">
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
        <h4>{disc.category}</h4>
        <p>
          {disc.speed} | {disc.glide} | {disc.turn} | {disc.fade}
        </p>
      </div>
    </div>
  );
}

export default DiscCard;

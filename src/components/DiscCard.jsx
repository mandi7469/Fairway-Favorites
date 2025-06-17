import "../css/DiscCard.css"

function DiscCard({ disc }) {
  function onFavoriteClick() {
    alert("clicked");
  }

  return (
    <div className="disc-card">
      <div className="disc-poster">
        <img src={disc.pic} alt={disc.title} />
        <div className="disc-overlay">
          <button className="favorite-btn" onClick={onFavoriteClick}>
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

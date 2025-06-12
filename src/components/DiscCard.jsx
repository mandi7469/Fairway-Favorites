function DiscCard({ disc }) {
  return (
    <div className="disc-card">
      <div className="disc-img">
        <img src={disc.url} alt={disc.title} />
      </div>
    </div>
  );
}

export default DiscCard;

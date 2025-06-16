import DiscCard from "../components/DiscCard";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const discs = [
    {
      id: 1,
      name: "Eagle",
      category: "Control Driver",
      speed: "7",
      glide: "4",
      turn: "-1",
      fade: "3",
    },
    {
      id: 2,
      name: "Warden",
      category: "Putter",
      speed: "2",
      glide: "3",
      turn: "0",
      fade: "1",
    },
    {
      id: 3,
      name: "Destroyer",
      category: "Distance Driver",
      speed: "12",
      glide: "5",
      turn: "-1",
      fade: "3",
    },
    {
      id: 4,
      name: "Spruce",
      category: "Midrange",
      speed: "5",
      glide: "4",
      turn: "-1",
      fade: "2",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for discs..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <div className="disc-grid">
        {discs.map(
          (disc) =>
            disc.name.toLowerCase().startsWith(searchQuery) && (
              <DiscCard disc={disc} key={disc.id} />
            )
        )}
      </div>
    </div>
  );
}

export default Home;

import DiscCard from "../components/DiscCard";
import { useState, useEffect } from "react";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allDiscs, setAllDiscs] = useState([]);
  const [filteredDiscs, setFilteredDiscs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState(false);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchDiscs = async () => {
      try {
        const response = await fetch("https://discit-api.fly.dev/disc");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllDiscs(data);
        setFilteredDiscs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);

    const results = allDiscs.filter(
      (disc) =>
        disc.name.toLowerCase().includes(term) ||
        (disc.category && disc.category.toLowerCase().includes(term))
    );
    setFilteredDiscs(results);
  };

  if (loading) {
    console.log("Failed to load discs");
  }

  if (error) {
    console.log("Failed to search discs");
  }

  return (
    <div className="home">
      <form className="search-form">
        <input
          type="text"
          placeholder="Search for discs by name or category..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />

        {/* <button type="submit" className="search-btn" onChange={handleSearch}>
          Search
        </button> */}
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="disc-grid">
          {filteredDiscs.map((disc) => (
            <DiscCard disc={disc} key={disc.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

// imports
import DiscCard from "../components/DiscCard";
import { useState, useEffect } from "react";
import FilterDialog from "../components/FilterDialog";
import "../css/Home.css";

const initialFlightFiltersState = {
  speed: 8, // Speed typically ranges from 1 to 15
  glide: 4, // Glide typically ranges from 1 to 7
  turn: -2, // Turn typically ranges from -5 to +1
  fade: 2, // Fade typically ranges from 0 to 5
};

// home component displays a list of discs, provides search functionality and handles data fetching from an API
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allDiscs, setAllDiscs] = useState([]);
  const [filteredDiscs, setFilteredDiscs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [activeFlightFilters, setActiveFlightFilters] = useState(
    initialFlightFiltersState
  ); // State to hold active numerical filters
  const [activeSearchType, setActiveSearchType] = useState("text");

  // useEffect hook to fetch disc data when the component mounts
  // the empty dependency array `[]` ensures this effect runs only once after the initial render
  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        // GET request to the disc API endpoint
        const response = await fetch("https://discit-api.fly.dev/disc");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // parse JSON data from response, update state with full list of discs
        // initialize filtered discs with all discs and setLoading to false once fetch is complete
        const data = await response.json();
        setAllDiscs(data);
        setFilteredDiscs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    // call function when the component mounts
    fetchDiscs();
  }, []);

  // handleSearch function updates the search query and filters the discs. It is called whenever the search input value changes
  const handleSearch = (e) => {
    e.preventDefault();

    // get the current input value and convert it to lowercase for case-insensitive search. Update the search query state
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);
    setActiveSearchType("text");

    // // filter the 'allDiscs' based on search term, check if disc's name includes search term
    // // or if disc's category exists and includes the search term
    const results = allDiscs.filter(
      (disc) =>
        disc.name.toLowerCase().includes(term) ||
        (disc.category && disc.category.toLowerCase().includes(term))
    );
    // update state with filtered results
    setFilteredDiscs(results);
  };

  const handleApplyFlightFilters = (filters, isClear = false) => {
    setActiveFlightFilters(filters);
    setSearchQuery("");

    if (isClear) {
      setFilteredDiscs(allDiscs);
      setActiveSearchType("text");
    } else {
      setActiveSearchType("flight");
      const flightFilteredResults = allDiscs.filter((disc) => {
        return (
          (disc.speed == filters.speed ) &&
          (disc.glide == filters.glide) &&
          (disc.turn == filters.turn) &&
          (disc.fade == filters.fade)
        );
      });
      setFilteredDiscs(flightFilteredResults);
    }
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
          value={searchQuery} // binds the input value to the searchQuery state
          onChange={handleSearch} // calls handleSearch function on input change
        />
      </form>
      <div className="filter-btn-container">
        <button
          className="filter-btn"
          type="button"
          onClick={() => setIsFilterDialogOpen(true)}
        >
          Filter by Flight
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* display a loading indicator if data is still being fetched */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="disc-grid">
          {/* Display a message if no discs are found for the current filter/search */}
          {filteredDiscs.length === 0 && !loading && !error && (
            <div className="error-message">No discs found matching your criteria</div>
          )}
          {/* map through the filteredDiscs array and render a DiscCard for each disc */}
          {filteredDiscs.map((disc) => (
            <DiscCard disc={disc} key={disc.id} /> // pass disc data as props and use disc.id as a unique key
          ))}
        </div>
      )}

      <FilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        initialFilters={activeFlightFilters}
        onApplyFilters={handleApplyFlightFilters}
      />
    </div>
  );
}

export default Home;

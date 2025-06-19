// imports
import DiscCard from "../components/DiscCard";
import { useState, useEffect } from "react";
import "../css/Home.css";

// home component displays a list of discs, provides search functionality and handles data fetching from an API
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allDiscs, setAllDiscs] = useState([]);
  const [filteredDiscs, setFilteredDiscs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    // filter the 'allDiscs' based on search term, check if disc's name includes search term
    // or if disc's category exists and includes the search term
    const results = allDiscs.filter(
      (disc) =>
        disc.name.toLowerCase().includes(term) ||
        (disc.category && disc.category.toLowerCase().includes(term))
    );
    // update state with filtered results
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
          value={searchQuery} // binds the input value to the searchQuery state
          onChange={handleSearch} // calls handleSearch function on input change
        />
      </form>

      {error && <div className="error-message">{error}</div>}

      {/* display a loading indicator if data is still being fetched */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="disc-grid">
          {/* map through the filteredDiscs array and render a DiscCard for each disc */}
          {filteredDiscs.map((disc) => (
            <DiscCard disc={disc} key={disc.id} /> // pass disc data as props and use disc.id as a unique key
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

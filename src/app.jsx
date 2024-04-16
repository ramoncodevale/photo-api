import  { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NavBar } from "./components/navbar/navbar";
import { Home } from "./pages/home/home";
import { SearchResults } from "./components/search-results/search-results"; // Importe o componente SearchResults
import { FaSearch } from "react-icons/fa";
import "./app.css"
import { Footer } from "./components/footer/footer";

export function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  async function fetchData(searchQuery) {
    const url = `https://pexelsdimasv1.p.rapidapi.com/v1/search?per_page=15&page=1&query=${searchQuery}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'OpnzOZ5HAoERAT63nvdF64EMddqccZvmekB7eLQiBmQP7OG5vu3ifehl',
        'X-RapidAPI-Key': '2c84f14307msh53a0198aeab41c3p177471jsn0d1ef02757c1',
        'X-RapidAPI-Host': 'pexelsdimasv1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data.photos)
      return data.photos;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function handleSearch(event) {
    event.preventDefault(); // Evita o comportamento padrão do formulário de recarregar a página
    const results = await fetchData(query);
    setSearchResults(results);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <NavBar/> 
      <section className="input"> 
      <form className="container-input" onSubmit={handleSearch}>
        <input  type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit"><FaSearch className="search-icon"/></button>
      </form>
      </section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults results={searchResults} />} />
      </Routes>  
        <Footer />
    </>
  );
}

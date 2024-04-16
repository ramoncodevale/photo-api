import './search-results.css';

export function SearchResults({ results }) {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("q");

  return (
    <section className='search-results'>
      <h2>Resultados da pesquisa para: {query}</h2>
      {results && results.length > 0 ? (
        <div className="image-grid">
          {results.map((result) => (
            <div key={result.id} className="image-item">
              <img src={result.src.medium} alt={result.photographer} />
               <p>Photographer: {result.photographer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-result'>Nenhum resultado encontrado.</p>
      )}
    </section>
  );
}

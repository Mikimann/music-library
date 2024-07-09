import { useState, useEffect } from 'react';
import { Artist } from './SearchAutocompleteBar.types';

export default function SearchAutocompleteBar() {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Artist[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/searchArtists?query=${query}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
        } else {
          console.log('Failed to fetch suggestions');
          setSuggestions([]);
        }
      } catch (error) {
        console.log('An error occurred while fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full"
        placeholder="Search artists..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded mt-1 w-full z-10">
          {suggestions.map((artist) => (
            <li
              key={artist._id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              <a href={`/artist/${artist._id}`}>{artist.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

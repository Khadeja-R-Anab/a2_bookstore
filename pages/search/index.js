import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { AuthContext } from '@/context/AuthContext';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  // Load history from API or localStorage
  useEffect(() => {
    if (user) {
      fetch(`/api/user/history?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setHistory(data))
        .catch((error) => console.error('Failed to load search history', error));
    } else {
      const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      setHistory(storedHistory);
    }
  }, [user]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/api/books');
      if (response.ok) {
        const books = await response.json();

        const filteredBooks = books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredBooks);

        if (user) {
          // Save search in the database for logged-in users
          try {
            const response = await fetch('/api/user/history', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.id, search: query }),
            });

            if (response.ok) {
              const updatedHistory = await fetch(`/api/user/history?userId=${user.id}`)
                .then((res) => res.json());
              setHistory(updatedHistory);
            } else {
              console.error('Failed to save search history');
            }
          } catch (error) {
            console.error('Error saving search history:', error);
          }
        }
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const loadToSearch = (item) => {
    setQuery(item);
  };

  const goToBook = (id) => {
    router.push('books/' + id);
  };

  const clearHistory = async () => {
    // Clear search history for logged-in users
    try {
      const response = await fetch(`/api/user/history?userId=${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHistory([]);
      } else {
        console.error('Failed to clear search history');
      }
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  return (
    <div className="container">
      <h1>Search Books</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book"
        />
        <Button type="submit" text="Search" />
      </form>

      <div>
        <h2>Search Results</h2>
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {results.map((book) => (
              <li key={book.id} onClick={() => goToBook(book.id)}>
                {book.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {user && (
        <div className="search-history">
          <h2>Your Recent Searches</h2>
          <ul>
            {history.length === 0 ? (
              <p>No recent searches</p>
            ) : (
              history.map((item, index) => (
                <li key={index} onClick={() => loadToSearch(item.search)}>
                  {item.search}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      { user && history.length !== 0 && (
        <Button text="Clear History" route={clearHistory} />
      )}

    </div>
  );
}

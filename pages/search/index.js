import { useEffect, useState } from 'react';
import booksData from '../../public/data/books.json';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  //load history from localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredBooks = booksData.books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredBooks);

    // Store search in localStorage
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.unshift(query); //add query to start of array. Append would add it to the end so we're not using that
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    
    //also add the query to the state so we get realtime update :)
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  };

  const loadToSearch = (item) => {
    setQuery(item)
  }

  const goToBook = (id) => {
    router.push('books/'+id)
  }

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  }

  return (
    <div className='container'>
      <h1>Search Books</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book"
        />
        <Button type={'submit'} text={'Search'}/>
      </form>

      <div>
        <h2>Search Results</h2>
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {results.map((book) => (
              <li key={book.id} onClick={() => goToBook(book.id)}>{book.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-history">
        <h2>Recent Searches</h2>
        <ul>
          {history.length === 0 ? (
            <p>No recent searches</p>
          ) : (
            history.map((item, index) => <li key={index} onClick={() => loadToSearch(item)}>{item}</li>)
          )}
        </ul>
      </div>

      {history.length !== 0 ? <Button text={'Clear History'} route={clearHistory}/> : <></>}
    </div>
  );
}

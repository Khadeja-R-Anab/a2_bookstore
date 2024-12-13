import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingGenre, setLoadingGenre] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBooksAndGenres = async () => {
      try {
        // Fetch books
        const booksResponse = await fetch('http://localhost:3000/api/books');
        if (!booksResponse.ok) {
          throw new Error('Failed to fetch books.');
        }
        const booksData = await booksResponse.json();
        setBooks(booksData);
        setLoadingBooks(false);
        // Fetch genres
        const genresResponse = await fetch('http://localhost:3000/api/genres');
        if (!genresResponse.ok) {
          throw new Error('Failed to fetch genres.');
        }
        const genresData = await genresResponse.json();
        setGenres(genresData);
        setLoadingGenre(false);
      } catch (error) {
        console.error('Error fetching books or genres:', error);
      }
    };

    fetchBooksAndGenres();
  }, []);

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genreId === selectedGenre)
    : books;

  const goToBook = (id) => {
    router.push('/books/' + id);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const selectGenre = (genreId) => {
    setSelectedGenre(genreId);
    setIsSidebarVisible(false); // Close sidebar on selection
  };

  return (
    <div className='container'>
      <h1>All Books</h1>

      <div className='books-and-filter'>
        <div className="sidebar">
          <h2>Genres</h2>
          {
            loadingGenre ? "Loading..." : 
            <ul>
              <li onClick={() => selectGenre('')}>All Genres</li>
              {genres.map((genre) => (
                <li key={genre._id} onClick={() => selectGenre(genre._id)}>
                  {genre.name}
                </li>
              ))}
            </ul>
          }
          
        </div>

        <div className="book-list grid">
          {
            loadingBooks ? "Loading..." : 
            filteredBooks.length === 0 ? (
              <p className='no-books'> No Books Found </p>
            ) : (
              filteredBooks.map((book) => (
                <div key={book._id} className="card">
                  <h2>{book.title}</h2>
                  <Button route={() => goToBook(book._id)} text={'View Details'} />
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}
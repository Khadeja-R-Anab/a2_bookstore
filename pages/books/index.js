import { useState } from 'react';
import booksData from '../../public/data/books.json';
import { useRouter } from 'next/router';
import Button from '@/components/Button';

export default function BooksPage() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const router = useRouter();

  const filteredBooks = selectedGenre
    ? booksData.books.filter((book) => book.genreId === selectedGenre)
    : booksData.books;

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
      {/* <img
        src='/filter.png'
        alt='Filter Icon'
        className='icons'
        onClick={toggleSidebar}
        style={{ cursor: 'pointer', width: '24px', height: '24px' }}
      /> */}

      <div className='books-and-filter'>
        <div className="sidebar">
          <h2>Genres</h2>
          <ul>
            <li onClick={() => selectGenre('')}>All Genres</li>
            {booksData.genres.map((genre) => (
              <li key={genre.id} onClick={() => selectGenre(genre.id)}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="book-list grid">
          {filteredBooks.length === 0 ? (
            <p className='no-books'> No Books Found </p>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id} className="card">
                <h2>{book.title}</h2>
                <Button route={() => goToBook(book.id)} text={'View Details'} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

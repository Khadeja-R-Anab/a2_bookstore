import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import booksData from '../public/data/books.json';
import Button from "@/components/Button";
import Featured from "@/components/Featured";

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState([]);

  //the first three books are featured
  useEffect(() => {
    setBooks(booksData.books.slice(0, 3));
  }, []);

  const goToGenres = () => {
    router.push('/genres');
  };

  const goToBooks = () => {
    router.push('/books');
  };

  const goToAuthors = () => {
    router.push('/authors');
  };

  const goToBook = (id) => {
    router.push('/books/' + id);
  };

  return (
    <>
      <div className="container home-page">
        <h1 className="home-title">Welcome to the Book Store</h1>
        
        {/* Featured Books Section */}
        <section>
          <h2>Featured Books</h2>
          <div className="featured-container">
            {books.map((book) => ( 
                <Featured title={book.title} description={book.description} click={() => goToBook(book.id)}/>
            ))}
          </div>
        </section>

        <div className="btn-navigate">
          <Button text={'View Genres'} route={goToGenres}/>
          <Button text={'View All Books'} route={goToBooks}/>
          <Button text={'View Authors'} route={goToAuthors}/>
        </div>
      </div>
    </>
  );
}

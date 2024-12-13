import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Featured from "@/components/Featured";

export default function Home() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true)

  // Fetch the first three books for the featured section
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books"); // Fetch all books from the API
        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }
        const data = await response.json();

        // Assuming books are sorted or we can slice the first three as featured
        setBooks(data.slice(0, 3));
        setLoading(false)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const goToGenres = () => {
    router.push("/genres");
  };

  const goToBooks = () => {
    router.push("/books");
  };

  const goToAuthors = () => {
    router.push("/authors");
  };

  const goToBook = (id) => {
    router.push("/books/" + id);
  };

  return (
    <>
      <div className="container home-page">
        <h1 className="home-title">Welcome to the Book Store</h1>

        {/* Featured Books Section */}
        <section>
          <h2>Featured Books</h2>
          <div className="featured-container">
            {
              loading === false ?
              books.map((book) => (
                <Featured
                  key={book._id} // Use MongoDB ObjectId as the key
                  title={book.title}
                  description={book.description}
                  click={() => goToBook(book._id)} // Pass the MongoDB ObjectId
                />
              )) : "Loading..."}
          </div>
        </section>

        <div className="btn-navigate">
          <Button text={"View Genres"} route={goToGenres} />
          <Button text={"View All Books"} route={goToBooks} />
          <Button text={"View Authors"} route={goToAuthors} />
        </div>
      </div>
    </>
  );
}

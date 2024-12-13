import { useRouter } from "next/router";
import withAuth from "@/helper/withAuth";

function AuthorDetails({ author, books }) {

  const router = useRouter();
  const goToBook = (id) => {
    router.push("/books/" + id);
  };

  return (
    <div className="container">
      <h1>{author.name}</h1>
      <p>{author.biography}</p>

      <h1>Books by {author.name}</h1>
      <div>
        {books.length === 0 ? (
          <p>No books available for this author.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                <p onClick={() => goToBook(book._id)}>{book.title}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default withAuth(AuthorDetails);

export async function getStaticProps({ params }) {
  const authorId = params.id;

  // Fetch the author and books data from the API
  const res = await fetch(`http://localhost:3000/api/authors/${authorId}`);
  const data = await res.json();
  console.log(data)
  if (!data.author) {
    return { notFound: true };
  }

  return {
    props: { author: data.author, books: data.books }, // Pass both author and books as props
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/authors');
  const data = await res.json();

  const paths = data.map((author) => ({
    params: { id: author._id },
  }));

  return { paths, fallback: false };
}
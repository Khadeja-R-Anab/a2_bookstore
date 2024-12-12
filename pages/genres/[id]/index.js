import booksData from '../../../public/data/books.json';
import { useRouter } from 'next/router';

export default function GenreDetails({ genre, books }) {
    const router = useRouter()
    const goToBook = (id) => {
        router.push('/books/' + id);
    }
    
    return (
        <div className='container'>
        <h1>Books in {genre.name} Genre</h1>
        
        {books.length > 0 ? (
            <ul>
            {books.map((book) => (
                <li key={book.id} onClick={() => goToBook(book.id)}>
                    {book.title}
                </li>
            ))}
            </ul>
        ) : (
            <p>No books found for this genre.</p>
        )}
        </div>
    );
}

export async function getStaticPaths() {
    const paths = booksData.genres.map((genre) => ({
        params: { id: genre.id }, //get all genres
    }));

    return { paths, fallback: false }; //no other genres apart from the ones loaded can be generated
}

export async function getStaticProps({ params }) {
    const genreId = params.id;

    const filteredBooks = booksData.books.filter(
        (book) => book.genreId === genreId //get all books with genre
    );

    const genre = booksData.genres.find((g) => g.id === genreId); //find requested genre

    return {
        props: {
            genre,
            books: filteredBooks,
        },
    };
}
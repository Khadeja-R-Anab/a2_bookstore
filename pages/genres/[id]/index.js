import { useRouter } from 'next/router';

export default function GenreDetails({ genre, books }) {
    const router = useRouter();
    const goToBook = (id) => {
        router.push('/books/' + id);
    };

    return (
        <div className='container'>
        <h1>Books in {genre.name} Genre</h1>
        
        {books.length > 0 ? (
            <ul>
            {books.map((book) => (
                <li key={book._id} onClick={() => goToBook(book._id)}>
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
    try {
        const res = await fetch(`http://localhost:3000/api/genres`);
        const genres = await res.json();

        const paths = genres.map((genre) => ({
            params: { id: genre._id },
        }));

        return { paths, fallback: false }; // Only pre-render genres available in the API
    } catch (error) {
        console.error('Error fetching genres:', error);
        return { paths: [], fallback: false };
    }
}


export async function getStaticProps({ params }) {
    const genreId = params.id;

    try {
        // Fetch all genres
        const genresRes = await fetch(`http://localhost:3000/api/genres`);
        if (!genresRes.ok) {
            throw new Error('Failed to fetch genres');
        }
        const genres = await genresRes.json();

        // Find the specific genre by ID
        const genre = genres.find((g) => g._id === genreId);
        if (!genre) {
            throw new Error('Genre not found');
        }

        // Fetch books for the genre
        const booksRes = await fetch(`http://localhost:3000/api/genres/${genreId}`);
        if (!booksRes.ok) {
            throw new Error('Failed to fetch books');
        }
        const books = await booksRes.json();

        return {
            props: {
                genre,
                books,
            },
        };
    } catch (error) {
        console.error('Error fetching genre details:', error);
        return {
            notFound: true,
        };
    }
}


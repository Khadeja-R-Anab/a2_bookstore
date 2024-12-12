import booksData from '../../../public/data/books.json';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function BookDetails({ book, reviewsWithUsers }) {
  const router = useRouter();

  const goToAuthor = (id) => {
    router.push('/authors/' + id);
  };

  const renderStars = (rating) => {
    const filledStars = Array(rating).fill('/star-filled.png');
    const emptyStars = Array(5 - rating).fill('/star.png');
    return [...filledStars, ...emptyStars];
  };

  return (
    <div className='container'>
      <h1>{book.title}</h1>
      <p><b>Description:</b> {book.description}</p>
      <p><b>Price:</b> ${book.price}</p>
      <p><b>Rating:</b> {book.rating}</p>
      <Button text={'About the Author'} route={() => goToAuthor(book.authorId)} />

      {reviewsWithUsers.length === 0 ? (
        <></>
      ) : (
        <div className='reviews'>
          <h2 className='review-heading'>Reviews</h2>
          {reviewsWithUsers.map((review) => (
            <div key={review.id} className='review'>
              <p className='rating'><b>{review.username}</b>
                <span>
                  {renderStars(review.rating).map((star, index) => (
                    <img key={index} src={star} alt='star' className='star'/>
                  ))}
                </span>
              </p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const book = booksData.books.find((b) => b.id === params.id);

  if (!book) {
    return { notFound: true };
  }

  // Filter reviews that match the book's ID
  const reviews = booksData.reviews.filter((review) => review.bookId === book.id);

  // Map each review to include the username by matching the userId
  const reviewsWithUsers = reviews.map((review) => {
    const user = booksData.users.find((user) => user.id === review.userId);
    return { ...review, username: user ? user.username : 'Anonymous' };
  });

  return {
    props: { book, reviewsWithUsers },
    revalidate: 60, // ISR revalidation
  };
}

export async function getStaticPaths() {
  const paths = booksData.books.map((book) => ({
    params: { id: book.id },
  }));

  return { paths, fallback: false };
}

import Button from '@/components/Button';
import withAuth from '@/helper/withAuth';
import { useRouter } from 'next/router';

function BookDetails({ book, reviewsWithUsers }) {
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
      {
        book ? 
        <div>
          <h1>{book.title}</h1>
          <p><b>Description:</b> {book.description}</p>
          <p><b>Price:</b> ${book.price}</p>
          <p><b>Rating:</b> {book.rating}</p>
          <Button text={'About the Author'} route={() => goToAuthor(book.authorId)} />
        </div> : "Loading Book Details..."
      }

      { reviewsWithUsers ? 
        reviewsWithUsers.length === 0 ? (
          <></>
        ) : (
          <div className='reviews'>
            <h2 className='review-heading'>Reviews</h2>
            {reviewsWithUsers.map((review) => (
              <div key={review._id} className='review'>
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
        ) : "Loading Reviews..."
      }
    </div>
  );
}

export default withAuth(BookDetails);

export async function getStaticProps({ params }) {
  try {
    console.log(params)
    const bookResponse = await fetch(`http://localhost:3000/api/books/${params.id}`);
    if (!bookResponse.ok) {
      throw new Error('Failed to fetch book data');
    }
    const book = await bookResponse.json();

    const reviewsResponse = await fetch(`http://localhost:3000/api/reviews/${params.id}`);
    if (!reviewsResponse.ok) {
      throw new Error('Failed to fetch reviews');
    }
    const reviews = await reviewsResponse.json();

    return {
      props: { book, reviewsWithUsers: reviews },
      revalidate: 60, // ISR revalidation
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const booksResponse = await fetch(`http://localhost:3000/api/books`);
    if (!booksResponse.ok) {
      throw new Error('Failed to fetch books data');
    }
    const books = await booksResponse.json();

    const paths = books.map((book) => ({
      params: { id: book._id },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: false };
  }
}

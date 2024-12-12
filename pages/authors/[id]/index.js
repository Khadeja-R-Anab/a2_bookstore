import booksData from '../../../public/data/books.json';

export default function AuthorDetails({ author }) {
  return (
    <div className='container'>
      <h1>{author.name}</h1>
      <p>{author.biography}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const author = booksData.authors.find((a) => a.id === params.id); //find requested author

  if (!author) {
    return { notFound: true };
  }

  return {
    props: { author },
  };
}

export async function getStaticPaths() {
  const paths = booksData.authors.map((author) => ({
    params: { id: author.id }, //get id of all authors
  }));

  return { paths, fallback: false };
}

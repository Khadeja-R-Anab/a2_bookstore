import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Authors({ authors }) {
  const [authorsByLetter, setAuthorsByLetter] = useState({});
  const router = useRouter();

  // Transform data into alphabetical sections
  useEffect(() => {
    if (authors) {
      // Group authors by the first letter
      const sortedAuthors = authors.reduce((acc, author) => {
        const firstLetter = author.name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(author);
        return acc;
      }, {});

      // Sort the authors within each letter and save the structure in state
      Object.keys(sortedAuthors).forEach((letter) => {
        sortedAuthors[letter].sort((a, b) => a.name.localeCompare(b.name));
      });

      setAuthorsByLetter(sortedAuthors);
    }
  }, [authors]);

  const goToAuthor = (id) => {
    router.push('/authors/' + id);
  };

  return (
    <div className='container'>
      <h1>Authors</h1>
      <div>
        {Object.keys(authorsByLetter)
          .sort()
          .map((letter) => (
            <div key={letter} className='letter-section'>
              <h2>{letter}</h2>
              <ul>
                {authorsByLetter[letter].map((author) => (
                  <li key={author._id} onClick={() => goToAuthor(author._id)}>
                    {author.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`http://localhost:3000/api/authors`);
    const authors = await res.json();

    return {
      props: { authors },
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return {
      props: { authors: [] },
    };
  }
}

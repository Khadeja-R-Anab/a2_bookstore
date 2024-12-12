import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

// Fetcher function to get data
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
  const { data, error } = useSWR('/data/books.json', fetcher);
  const [authorsByLetter, setAuthorsByLetter] = useState({});
  const router = useRouter();

  // Transform data into alphabetical sections
  useEffect(() => {
    if (data) {
      const authorsArray = data.authors.map(author => ({
        id: author.id,
        name: author.name,
      }));
      
      // Group authors by the first letter
      const sortedAuthors = authorsArray.reduce((acc, author) => {
        const firstLetter = author.name[0].toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(author);
        return acc;
      }, {});

      // Sort the authors within each letter and save the structure in state
      Object.keys(sortedAuthors).forEach(letter => {
        sortedAuthors[letter].sort((a, b) => a.name.localeCompare(b.name));
      });
      
      setAuthorsByLetter(sortedAuthors);
    }
  }, [data]);

  const goToAuthor = (id) => {
    router.push('/authors/' + id);
  };

  if (!data) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to Load</p>;
  }

  return (
    <div className='container'>
      <h1>Authors</h1>
      <div>
        {Object.keys(authorsByLetter).sort().map(letter => (
          <div key={letter}  className='letter-section'>
            <h2>{letter}</h2>
            <ul>
              {authorsByLetter[letter].map(author => (
                <li key={author.id} onClick={() => goToAuthor(author.id)}>
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

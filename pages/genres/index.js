import { useRouter } from 'next/router';
import booksData from '../../public/data/books.json';
import { useState, useEffect } from 'react';

export default function Genres({ genres }) {
  const router = useRouter();
  const [genresByLetter, setGenresByLetter] = useState({});

  useEffect(() => {
    // Group genres by the first letter
    const sortedGenres = genres.reduce((acc, genre) => {
      const firstLetter = genre.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(genre);
      return acc;
    }, {});

    // Sort genres within each letter section
    Object.keys(sortedGenres).forEach(letter => {
      sortedGenres[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    setGenresByLetter(sortedGenres);
  }, [genres]);

  const goToGenre = (id) => {
    router.push('/genres/' + id);
  };

  return (
    <div className='container'>
      <h1>Genres</h1>
      <div className='alphabetical-list'>
        {Object.keys(genresByLetter).sort().map(letter => (
          <div key={letter} className='letter-section'>
            <h2>{letter}</h2>
            <ul>
              {genresByLetter[letter].map(genre => (
                <li key={genre.id} onClick={() => goToGenre(genre.id)}>
                  {genre.name}
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
  return {
    props: { genres: booksData.genres },
  };
}

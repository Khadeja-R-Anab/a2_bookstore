import { useRouter } from 'next/router';

export default function InfoPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className='container'>
      <h1>Information</h1>
      {slug ? <p>Requested info: {slug.join('/')}</p> : <p>General information page</p>}
    </div>
  );
}

import { useRouter } from "next/router";

export default function InfoIndexPage() {
  const router = useRouter();

  //random topics
  const topics = [
    'How to Buy Books',
    'Author Profiles',
    'Book Genres',
    'Frequently Asked Questions',
    'Return Policy',
    'Contact Information',
    'Our Story',
    'Shipping and Delivery',
    'Promotions and Discounts',
    'Privacy Policy'
  ];
  
  const goToSlug = (topic) => {
    router.push('/info/' + topic)
  }

  return (
    <div className="container">
      <h1>Information Overview</h1>
      <h3>Welcome to the information section. Please choose a topic:</h3>
      <ul>
        {topics.map((topic) => (
          <li key={topic} onClick={() => goToSlug(topic)}> {topic} </li>
        ))}
      </ul>
    </div>
  );
}

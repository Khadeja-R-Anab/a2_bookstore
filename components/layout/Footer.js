import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter()

  const goToInfo = () => {
    router.push('/info')
  }

  return (
    <footer className="footer">
      {/* <p>&copy; {new Date().getFullYear()} Book Store. All Rights Reserved.</p> */}
      <p onClick={goToInfo}>Help and Support</p>
    </footer>
  );
}
  
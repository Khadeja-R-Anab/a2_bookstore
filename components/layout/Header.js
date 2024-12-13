import { useState, useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { useLoading } from '@/context/LoadingContext';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  
  const { user, logout } = useContext(AuthContext); // Access user and logout from context

  const { setIsLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router, setIsLoading]);

  //add an remove classes to change theme
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  //routing
  const goToHome = () => {
    router.push('/');
  };
  const goToSearch = () => {
    router.push('/search');
  }

  const handleAuthAction = () => {
    if (user) {
      logout(); // Call logout function if the user is logged in
      router.push('/');
    } else {
      router.push('/login'); // Navigate to login page if not logged in
    }
  };

  return (
    <div className="header">
      {/* only showing back button if not on home page */}
      {router.pathname !== '/' && ( 
        <img 
          className='icons'
          src='/back.png'
          onClick={() => router.back()}
          alt='Go Back'
        />
      )}

      <h1 className="title" onClick={goToHome}>Book Store</h1>
      
      <img
        className="icons" 
        onClick={goToSearch} 
        src='/search.png'
        alt='search books'
      />
      <span className='theme'>
        <img 
          className="icons" 
          onClick={()=> setDarkMode(!darkMode)} 
          src='/toggle.png'
          alt='toggle theme'
        />
      </span>
      
      {/* Login/Logout Button */}
      <button className="auth-button" onClick={handleAuthAction}>
        {user ? "Logout" : "Login"}
      </button>

    </div>
  );
}

import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  
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
      
    </div>
  );
}

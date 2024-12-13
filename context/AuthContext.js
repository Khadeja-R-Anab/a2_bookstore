import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Login handler
  async function login(username, password) {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser({ email: data.email, token: data.token });
      return true;
    } else {
      return false;
    }
  }

  // Logout handler
  function logout() {
    fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
    setUser(null);
  }

  // Check if user is already logged in
  useEffect(() => {
    // (Optional) Check for stored session on app load
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  useEffect(() => {
    // Save user info to localStorage
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

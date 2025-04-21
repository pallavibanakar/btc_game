import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignIn.css';

const SignIn: React.FC = () => {
  const { login, setUserId } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email: email, password: password } }),
      });

      const contentType = res.headers.get('content-type');
      let body: any;

      if (contentType && contentType.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }
  
      if (!res.ok) {
        throw new Error(typeof body === 'string' ? body : body?.error || 'Login failed');
      }

      const rawToken = res.headers.get('Authorization');
      const token = rawToken?.replace('Bearer ', '');
      setUserId(body?.status?.data?.user?.id)
      if (token) {
        localStorage.setItem('token', token);
        login(token);
        navigate('/');
      } else {
        setError('Token not found in response');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.error(err);
    }
  };
  

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="signin-form" onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, setUserId } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email: email, password: password, name: userName } }),
      });

      if (!res.ok) throw new Error('Signup failed');

      const rawToken = res.headers.get('Authorization');
      const token = rawToken?.replace('Bearer ', '');
      const body = await res.json();

      if (token) {
        login(token);
        navigate('/');
        setUserId(body?.data?.id)
      } else {
        setError('Token not found in response');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form className="signup-form" onSubmit={handleSignUp}>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

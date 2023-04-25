import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../features/users/userLogin';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
const navigate =   useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAccount({ email: 'admin@example.com', password: 'password' }));
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  background-color: #0f1c3f;
  color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  background-color: #2c3e50;
  padding: 40px;
  border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #3498db;
  color: white;
  font-size: 16px;
`;

const LinkTo = styled.p`
  margin-top: 20px;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password
      });
      if (response.status === 200) {
        const { user } = response.data;
        console.log('Login successful:', user);
        navigate('/homepage');
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('An error occurred during login');
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Field>
            <Input
              type="text"
              name="username"
              placeholder='Username'
              value={username}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <Input
              type="password"
              name="password"
              placeholder='Password'
              value={password}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <LinkTo>
            New User? <Link to='/'>Register Here</Link>
          </LinkTo>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Login;
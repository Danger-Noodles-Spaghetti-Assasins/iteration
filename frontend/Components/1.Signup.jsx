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

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
    if (name === 'email') setEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        username,
        password,
        email,
      });
      if (response.status === 200) {
        const { user, token } = response.data;
        localStorage.setItem('token', token); // store the token in localstorage
        console.log('User registered successfully:', response.data);
        navigate('/homepage');
      } else {
        console.error('Unexpected status code:', response.status);
        alert('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <Field>
            <Input
              type="text"
              name="username"
              placeholder='Username:'
              value={username}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <Input
              type="password"
              name="password"
              placeholder='Password:'
              value={password}
              onChange={handleInputChange}
              required
            />
          </Field>
          <Field>
            <Input
              type="email"
              name="email"
              placeholder='Email:'
              value={email}
              onChange={handleInputChange}
            />
          </Field>
          <Field>
            <Button type="submit">Register</Button>
          </Field>
          <LinkTo>
            Already have an account? <Link to='/login'>Login Here</Link>
          </LinkTo>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Signup;
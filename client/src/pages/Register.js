import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export const Register = () => {
  const [registerCredentials, setRegisterCredentials] = useState({
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegisterCredentials({
      ...registerCredentials,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...registerCredentials },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div >
      <h4 >Register</h4>
      <div >
        {data ? (
          <div>
            Success! please go to login page
            <Link to="/Login">Login page</Link>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="email"
              name="email"
              type="email"
              value={registerCredentials.email}
              onChange={handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              value={registerCredentials.password}
              onChange={handleChange}
            />
            <button
              type="submit"
            >
              Register
            </button>
          </form>
        )}

        {error && (
          <div >
            {error.message}  Registration Failed
          </div>
        )}
        <Link to="/">Back </Link>
      </div>
    </div>
  );




















}

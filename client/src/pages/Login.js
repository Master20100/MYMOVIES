import React, { useState } from 'react';
import {Link}  from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import TokenAuth from '../utils/auth';

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({ email:"", password:""});
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCredentials({
      ...loginCredentials,
      [name]: value,
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...loginCredentials },
      });

      TokenAuth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setLoginCredentials({
      email: '',
      password: '',
    });
  };

  return (
        <div >
          <h4 >Login</h4>
            {data ? (
              <div>
                Login success, Please head to the search page
                <Link to="/Imdb">Search Page</Link>
                <Link to="/">Back </Link> 
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  placeholder="email"
                  name="email"
                  type="email"
                  value={loginCredentials.email}
                  onChange={handleChange}
                />
                <input
                  placeholder="password"
                  name="password"
                  type="password"
                  value={loginCredentials.password}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}

            {error && (
              <div>
                {error.message}Login Failed
              </div>
            )}
          </div>
  );

}

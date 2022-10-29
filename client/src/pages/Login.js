import React, { useState } from 'react';
import {Link}  from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import TokenAuth from '../utils/auth';
import {Button} from "antd";
import {Input} from "antd";
import {Form} from "antd";

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
          <Link to="/"> Back</Link>
          <h4 >Login</h4>
            {data ? (
              <div>
                Login success, Please head to the search page
                <Link to="/Imdb">Search Page</Link>
                <Link to="/">Back </Link> 
              </div>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Input
                  placeholder="email"
                  name="email"
                  type="email"
                  value={loginCredentials.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="password"
                  name="password"
                  type="password"
                  value={loginCredentials.password}
                  onChange={handleChange}
                />
                <Button
                  onClick={handleFormSubmit}
                >
                  Login
                </Button>
              </Form>
            )}

            {error && (
              <div>
                {error.message}Login Failed
              </div>
            )}
          </div>
  );

}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {Button} from "antd";
import {Input} from "antd";
import {Form} from "antd";
import './Register.css';



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

      Auth.register(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id='Register'>
      <h3 >Register</h3>
      <div >
        {data ? (
          <div>
            Success! please go to login page
            <Link to="/Login">Login page</Link>
          </div>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <Input
              className='loginFields'
              placeholder="email"
              name="email"
              type="email"
              value={registerCredentials.email}
              onChange={handleChange}
            />
            <Input
              className ='loginFields'
              placeholder="password"
              name="password"
              type="password"
              value={registerCredentials.password}
              onChange={handleChange}
            />
            <Button
              onClick={handleFormSubmit}
            >
              Register
            </Button>
          </Form>
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

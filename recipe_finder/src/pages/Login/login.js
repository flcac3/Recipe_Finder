import './login.css';
import axios from 'axios';
import swal from 'sweetalert';
import React, {useContext, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {MyContext} from '../../context';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(MyContext);
  
  // function to login user when button is clicked
  function handleLogin(e){
    e.preventDefault();
    if(!email || !password){
        return alert('Please fill out the fields');
    }

    axios
    .post(`${window.env.API_URL}/login`, {email, password})
    .then(({data}) => {
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate('/', { replace: true });
      swal("Logged in successfully!", {
        icon: "success",
        buttons: false,
        timer: 2000,
      });
  })
    .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <div className="form-container">
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
          </Form.Group>

          <Form.Group className=" mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
          </Form.Group>

          <Button className="login-button mt-3 w-100" variant="link" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
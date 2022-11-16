import './signup.css';
import axios from 'axios';
import swal from 'sweetalert';
import React, {useContext, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {MyContext} from '../../context';
import {useNavigate} from 'react-router-dom';


function SignUpPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(MyContext);

    // sign up user
    function handleSignUp(e){
        e.preventDefault();
        if(!email || !password){
            return alert('Please fill out the fields');
        }

        axios
        .post(`${window.env.API_URL}/signup`, {email, password})
        .then(({data}) => {
            setUser(data);
            localStorage.setItem("token", data.token);
            navigate('/', { replace: true });
            swal("Signed up and logged in successfully!", {
              icon: "success",
              buttons: false,
              timer: 2000,
            });
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="signup">
            <div className="form-container">
                <h1>Sign Up</h1>
                <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                </Form.Group>

                <Button className="signup-button mt-3 w-100" variant="link" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUpPage;
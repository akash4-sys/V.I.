import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name:"", email: "", password: "" });
    let Navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const {name,email,password} = credentials;

        const response = await fetch("http://localhost:80/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNGJkYzE2ZDJkZmQ2NDhhOWFiMzUwIn0sImlhdCI6MTY0MzQyOTMxM30.fM9FgBuFeu9UA6EwEbLL9xx4Hj2GpAAn_DCP4MxopMc'
            },
            body: JSON.stringify({name,email,password})
        });
        const json = await response.json();

        if(json.success){

            localStorage.setItem('token', json.authtoken);
            Navigate("/");

            props.showAlert("User Successfully registered", "success");

        }else{

            props.showAlert("Invalid Credentials", "danger");

        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Your Name</label>
                    <input type="name" className="form-control"  autoComplete="off" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email"  autoComplete="on" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  autoComplete="off" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Signup;

import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});
    let  Navigate =  useNavigate();

    const handleSubmit = async(e) => {

        e.preventDefault();
        const response = await fetch("http://localhost:80/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        if(json.success){

            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in successfully", "success");
            
            // redirecting using Navigate hook  History hook is replaced by Navigate hook
            Navigate("/");
        }
        else{

            props.showAlert("Invalid Credentials", "danger");

        }

    }

    const onChange = (e) => {

        setCredentials({...credentials, [e.target.name]: e.target.value})

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" autoComplete="on" name="email" className="form-control" id="email" aria-describedby="emailHelp"  value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  autoComplete="current-password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
};

export default Login;

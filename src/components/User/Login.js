import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import api from '../Services/api';
import './User.css';



const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()
  
    const handleChange = e => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
    }
  
    const handleSubmit = async e => {
      e.preventDefault()
      try {
        const response = await api.post('/users/login', formData)
        localStorage.setItem('user', response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('signo', response.data.signo)
        navigate('/')
      } catch (error) {
        setError('Invalid credentials')
      }
    }


    const handleCreateRedirect = () => {
        navigate('/create-user'); 
    };

    return (
        <div className='user-form'>
            <div className='heading'>
            {error && <p>Error: {error}</p>}
                <p>Login</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
            <div className="fullscreen-container">
                <div className="centered-div">
                    <p>New to Horoscopes for you?</p>
                    <button type="button" className="btn btn-primary submit-btn" onClick={handleCreateRedirect}>SIGN UP</button>
                </div>
        </div>
        </div>
    )
}

export default Login
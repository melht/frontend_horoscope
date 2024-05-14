import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './User.css';
import api from '../Services/api';


const CreateUser = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        signo: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...user, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(user)
        try {
            await api.post('/users/registrar', user);

            if (user !== null) {
                console.log('Form submitted successfully!');
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } 
    }

    const handleLoginRedirect = () => {
        navigate('/login'); 
    };

    return (
        <div className='user-form'>
            <div className='heading'>
            {error && <p>Error: {error}</p>}
                <p>Sign Up</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={handelInput} />
                </div>
                <div>
                    <label htmlFor="signo" className="form-label">My sign is</label>
                    <select className="form-control" id="signo" name="signo" value={user.signo} onChange={handelInput}>
                        <option value="">Select your sign</option>
                        <option value="Aries">Aries</option>
                        <option value="Taurus">Taurus</option>
                        <option value="Gemini">Gemini</option>
                        <option value="Cancer">Cancer</option>
                        <option value="Leo">Leo</option>
                        <option value="Virgo">Virgo</option>
                        <option value="Libra">Libra</option>
                        <option value="Scorpius">Scorpius</option>
                        <option value="Sagittarius">Sagittarius</option>
                        <option value="Capricorn">Capricorn</option>
                        <option value="Aquarius">Aquarius</option>
                        <option value="Pisces">Pisces</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
            <div className="fullscreen-container">
                <div className="centered-div">
                    <p>Already has an account?</p>
                    <button type="button" className="btn btn-primary submit-btn" onClick={handleLoginRedirect}>LOGIN</button>
                </div>
        </div>
        </div>
    )
}

export default CreateUser
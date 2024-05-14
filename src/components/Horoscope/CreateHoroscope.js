import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import './Horoscope.css';
import api from '../Services/api';


const CreateHoroscope = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [horoscope, setHoroscope] = useState({
        signo: "",
        contenido: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setHoroscope({ ...horoscope, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        console.log(horoscope)
        try {
            const response = await api.post('/horoscopo/crearhoroscopo', horoscope, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
            if (response) {
                navigate('/show-horoscope');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } 
    }

    return (
        <div className='horoscope-form'>
            <div className='heading'>
            {error && <p>Error: {error}</p>}
                <p>Create Horoscope</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="signo" className="form-label">Sign</label>
                    <select className="form-control" id="signo" name="signo" value={horoscope.signo} onChange={handelInput}>
                        <option value="">Select sign</option>
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
                <div className="mb-3">
                    <label for="contenido" className="form-label">Description</label>
                    <input type="text" className="form-control" id="contenido" name="contenido" value={horoscope.contenido} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateHoroscope
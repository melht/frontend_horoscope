import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from '../Services/api';

const ShowHoroscope = () => {

  const user = localStorage.getItem('user')

  const [horoscope, setHoroscope] = useState([]);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    try {
      const response = await api.delete(`/users/${id}`)
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setHoroscope(horoscope.filter((item) => item.email !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getHoroscopes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHoroscopes = async () => {
    
    let response
    if(user) {
      response = await api.get(`/horoscopo/${String(localStorage.getItem('signo'))}`)
    } else{
      response = await api.get('/horoscopo')
    }
    console.log(response.data);
    setHoroscope(response.data)
  };

  if (!horoscope) {
    return <h1>no horoscope found</h1>;
  } else {
    return (
      <div className="mt-5">
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sign</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            { horoscope.map((item, i) => {
              return (
                <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td>{item.signo}</td>
                  <td>{item.fecha}</td>
                  <td>{item.contenido}</td>
                  <td>
                    {user?(
                    <div>
                    <Link to={`/edit-horoscope/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/horoscope/${item.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(item.id)}
                    ></i>
                    </div>
                    ): (<div></div>)}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ShowHoroscope;
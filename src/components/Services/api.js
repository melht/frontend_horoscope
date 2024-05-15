import axios from 'axios'

export default axios.create({
    /*baseURL: 'http://localhost:8000/api'*/
    baseURL: 'https://api-horoscopes.azurewebsites.net/api'
})
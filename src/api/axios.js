import axios from 'axios';

export default axios.create({
    // CHANGE THIS to match your local path
    baseURL: 'http://localhost/chris-emma-api/api' 
});
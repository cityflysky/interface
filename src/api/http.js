import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://demo.bbbing.co',
    baseURL: 'https://lending.bbbing.co',
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
});
export default instance

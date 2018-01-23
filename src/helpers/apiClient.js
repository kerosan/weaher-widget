import axios from 'axios';
// import config from '../config';

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
};

// export const baseURL = `${config.protocol}://${config.host}:${config.port}`;
export const baseURL = `http://api.openweathermap.org/data/2.5`;

const apiClient = axios.create({
    baseURL,
});
if ( localStorage.getItem('authHeader'))
    apiClient.defaults.headers.Authorization = `Bearer ${localStorage.getItem('authHeader')}`;


apiClient.interceptors.response.use(function (response) {
    if (response.headers.authorization){
        setToken(response.headers.authorization.replace('Bearer ', ''));
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});


export function setToken(header) {
    apiClient.defaults.headers.Authorization = `Bearer ${header}`;
    localStorage.setItem('authHeader', header);
}

export function removeToken() {
    apiClient.defaults.headers.Authorization = '';
    localStorage.removeItem('authHeader');
}
export default apiClient;

import axios from 'axios'
import store from "../store"

export default class Auth {
  constructor () {
    //axios.defaults.baseURL = 'http://localhost:8000/api/auth';
    //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
  }

  login(user) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    store.dispatch('clearSuccess');
    return axios.post('http://localhost:8000/api/auth/login', user)
        .then((response) => {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          store.dispatch('initUser', response.data.user);
          store.dispatch('setSuccess', {'message': `Welcome ${response.data.user[0].name} !`} );
          store.dispatch('setLoadingFalse');
        })
        .catch((error) => {
          store.dispatch('setLoadingFalse');
          //console.log(error.response.data.errors);
          store.dispatch('setError', error.response.data.errors);
        });
  }

  register(user) {
    store.dispatch('setLoadingTrue');
    store.dispatch('clearError');
    store.dispatch('clearSuccess');
    return axios.post('http://localhost:8000/api/auth/register', user)
        .then((response) => {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          store.dispatch('initUser', response.data.user);
          store.dispatch('setSuccess', {'message': `Welcome ${response.data.user[0].name} !`} );
          store.dispatch('setLoadingFalse');
          
        })
        .catch((error) => {
          store.dispatch('setLoadingFalse');
          store.dispatch('setError', error.response.data.errors );
        });
  }
}

export const auth = new Auth();
import { API } from 'nintendoapp/js/constants/api';
import fetchData from 'nintendoapp/js/api/fetchData';

export const userService = {
  login,
  reset,
  resend,
  register,
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${API.BACKEND_URL}/users/login`, requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then(user => {
      // login successful if there's a jwt token in the response
      return user;
    });
}

function reset(email) {
  const formData = new FormData();
  formData.append('email', email);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
    // before
    // body: JSON.stringify({ email }),
  };

  return fetchData(`${API.BACKEND_URL}/users/reset_password`, requestOptions);
}

function resend(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return fetchData(`${API.BACKEND_URL}/users/resend_confirmation`, requestOptions);
}

function register(first_name, last_name, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    }),
  };

  return fetchData(`${API.BACKEND_URL}/users/register`, requestOptions);
}

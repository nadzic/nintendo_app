import { API } from 'nintendoapp/js/constants/api';
import fetchData from 'nintendoapp/js/api/fetchData';

export const paymentService = {
  getCreditCard,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
};

export function getCreditCard(auth_token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
  };

  return fetchData(`${API.BACKEND_URL}/payment_methods`, requestOptions);
}

export function addCreditCard(auth_token, number, exp_month, exp_year, cvc, address_zip) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      number,
      exp_month,
      exp_year,
      cvc,
      address_zip,
    }),
  };

  return fetchData(`${API.BACKEND_URL}/payment_methods`, requestOptions);
}

export function updateCreditCard(auth_token, exp_month, exp_year, address_zip) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exp_month,
      exp_year,
      address_zip,
    }),
  };

  return fetchData(`${API.BACKEND_URL}/payment_methods`, requestOptions);
}

export function deleteCreditCard(auth_token) {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
  };

  return fetchData(`${API.BACKEND_URL}/payment_methods`, requestOptions);
}

import { API } from 'nintendoapp/js/constants/api';
import fetchData from 'nintendoapp/js/api/fetchData';

export const purchaseService = {
  makeKioskPurchase,
  scanKitchen,
};

export function makeKioskPurchase(auth_token, variants, quantities) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variants,
      quantities,
    }),
  };

  return fetchData(`${API.BACKEND_URL}/kiosk_purchases`, requestOptions);
}

// upc code (barcode) is company id in this case
export function scanKitchen(auth_token, upc_code) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company_id: upc_code }),
  };

  return fetchData(`${API.BACKEND_URL}/kiosk_purchases/save_kitchen`, requestOptions);
}

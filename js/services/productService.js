import { API } from 'nintendoapp/js/constants/api';
import fetchData from 'nintendoapp/js/api/fetchData';

export const productService = {
  scanProduct,
};

export function scanProduct(auth_token, upc_code, company_id) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      upc_code,
      company_id,
    }),
  };

  return fetchData(`${API.BACKEND_URL}/kiosk_purchases/scan_product`, requestOptions);
}

import { refreshToken } from './auth/auth'; // Import your token refresh function
import { API_BASE_URL } from '../config/config';

type CustomHeaders = {
  'Content-Type': string;
  'Authorization'?: string;
};

export async function apiCall(route: any, method = 'GET', body = null, token = false) {
  
  const URL = API_BASE_URL + route
  
  var headers: CustomHeaders = {
    'Content-Type': 'application/json'
  };

  if(token) {
    headers.Authorization = `Bearer ${
      route.inclueds('refresh-token') ? localStorage.getItem('refreshToken') : localStorage.getItem('accessToken')
    }`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(URL, options);

  // If the response indicates an expired token, attempt to refresh it
  if (response.status === 401) {
    try {
      const newAccessToken = await refreshToken();

      // Retry the original request with the new access token
      headers.Authorization = `Bearer ${newAccessToken}`;
      const retryOptions = { ...options, headers };
      const retryResponse = await fetch(URL, retryOptions);

      return retryResponse.json();
    } catch (error) {
      // Token refresh failed, handle the error as needed
      console.error('Token refresh failed:', error);
      throw new Error('Token refresh failed');
    }
  }

  // If the response is not a 401, return the result
  return response.json();
}

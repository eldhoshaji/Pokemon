import { apiCall } from '../api';

export async function refreshToken(){
    const urlRoute = '/auth/refresh'; // Adjust the endpoint as per your backend
    const tokens = await apiCall(urlRoute, 'GET', null);
    return tokens
  }
import { API } from '../config/api-config';

/**
 * 
 * @param token 
 * To set token to localstorage
 * 
 */
export const SaveAuth = (token) => {
  localStorage.setItem('token',token);
};

/**
 * 
 * @param payload 
 * call api to authenticate
 * 
 */

export const Login = async (payload: any) => {
  const { url, method } = API.AUTH.LOGIN;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};



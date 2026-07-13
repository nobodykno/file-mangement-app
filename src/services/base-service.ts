import handleResponse from '../handler/request-handler';



const getToken = (): string | null => {
  return localStorage.getItem('token');
};
  
const getHeaders = (isFormData: boolean = false) => {
  const headers: any = {
    'Authorization': `Bearer ${getToken()}`
  };
  

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};
  

export const httpService = async (
  url: string,
  method: string,
  body?: any,
  isFormData: boolean = false
) => {
  
  const options: RequestInit = {
    method,
    headers: getHeaders(isFormData)
  };

  if (body) {
    options.body = isFormData
      ? body                        
      : JSON.stringify(body);       
  }

  
  const response = await fetch(url, options);
  return handleResponse(response);
};


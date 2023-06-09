const BASE_API_URL = 'http://localhost:3001';

export const fetchData = async (url) => {
  const response = await fetch(`${BASE_API_URL}/${url}`);
  const data = await response.json();

  return { ok: response.ok, data };
}

export const postData = async (url, payload) => {
  const response = await fetch(`${BASE_API_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  
  return { ok: response.ok, data };
}

export const putData = async (url, payload) => {
  const response = await fetch(`${BASE_API_URL}/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  
  return { ok: response.ok, data };
}
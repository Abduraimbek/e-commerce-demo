import { config } from './config';
import { getToken } from './localstorage';

const getRequest = async (path) => {
  try {
    const params = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };

    const res = await fetch(config.baseUrl + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (err) {
    return { statusCode: 400, data: [] };
  }
};

const postRequest = async (path, body) => {
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseUrl + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (err) {}
};

const deleteRequest = async (path) => {
  try {
    const params = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
    };

    const res = await fetch(config.baseUrl + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (err) {}
};

const putRequest = async (path, body) => {
  try {
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(config.baseUrl + path, params);
    const data = await res.text();
    return { statusCode: res.status, data };
  } catch (err) {}
};

export const Api = { getRequest, postRequest, deleteRequest, putRequest };

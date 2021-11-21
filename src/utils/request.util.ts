import { app } from '../constants';

type fetchMethod = 'get' | 'post' | 'put' | 'delete' | 'PATCH';

interface networkMessage {}

const errorHandling = async function (response: Response): Promise<boolean> {
  const { status } = response;

  if (status === 401) {
    return false;
  }

  return true;
};
const callFetch = function (
  url: string,
  method: fetchMethod,
  body: any,
  token?: string,
  isFormData?: boolean,
): Promise<Response> {
  const init: RequestInit = isFormData
    ? {
        headers: { Authorization: `Bearer ${token}` },
        method,
        body,
      }
    : {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method,
        body: method !== 'get' ? JSON.stringify(body) : undefined,
      };
  return fetch(url, init);
};
const toJson = async function <O>(response: Response): Promise<O & networkMessage> {
  let body: O & networkMessage;
  try {
    body = await response.clone().json();
  } catch (err) {
    const responseText = await response.text();
    throw new Error(`Error converting to json : ${responseText}`);
  }

  return body;
};
const callApiBase = async function <I, O>(
  url: string,
  method: fetchMethod,
  body: I | undefined = undefined,
  token?: string,
  isFormData?: boolean,
): Promise<(O & networkMessage) | undefined> {
  let serverUrl = app.serverBaseUri || 'http://localhost:5000';

  if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) serverUrl = '';

  const response: Response = await callFetch(`${serverUrl}${url}`, method, body, token, isFormData);

  const ok = await errorHandling(response);
  if (ok) return toJson<O>(response);

  // console.log('Available after login');
  return undefined;
};

export default {
  get: <I, O>(url: string, token: string): Promise<(O & networkMessage) | undefined> =>
    callApiBase<I, O>(url, 'get', undefined, token),
  post: <I, O>(
    url: string,
    body: I,
    token?: string,
    isFormData?: boolean,
  ): Promise<(O & networkMessage) | undefined> =>
    callApiBase<I, O>(url, 'post', body, token, isFormData),
  put: <I, O>(url: string, body: I, token?: string): Promise<(O & networkMessage) | undefined> =>
    callApiBase<I, O>(url, 'put', body, token),
  delete: <I, O>(url: string, body: I): Promise<(O & networkMessage) | undefined> =>
    callApiBase<I, O>(url, 'delete', body),

  patch: <I, O>(url: string, body: I): Promise<(O & networkMessage) | undefined> =>
    callApiBase<I, O>(url, 'PATCH', body),
};

import axios, { AxiosRequestConfig } from 'axios'

/* eslint-disable */
export interface RequestArgs {
  url: string;
  body?: object;
  header?: object;
  method?: AxiosRequestConfig['method'];
};

const VUE_APP_API_DOMAIN = 'http://localhost:8000';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function requestBase (params: RequestArgs, method: AxiosRequestConfig['method'] = 'GET'): Promise<any> {
  const { body, header, url } = params;
  const requestUrl = url.match(/^((http|https):\/\/)/g) ? url : `${VUE_APP_API_DOMAIN}${url}`;

  return axios({
    method: method,
    url: requestUrl,
    data: body,
    headers: {
      ...header
    }
  }).then((response: { data: object }) => response.data);
};

/* eslint-disable */
export const request = {
  get: (params: RequestArgs) => requestBase(params, 'GET'),
  post: (params: RequestArgs) => requestBase(params, 'POST'),
  patch: (params: RequestArgs) => requestBase(params, 'PATCH'),
  delete: (params: RequestArgs) => requestBase(params, 'DELETE'),
  put: (params: RequestArgs) => requestBase(params, 'PUT')
};

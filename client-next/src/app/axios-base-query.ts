import { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'https://codeexpert.dev';

const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  },
  unknown,
  unknown
> => {
  return async ({ url, method, data }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await axios({ url, method, data });
      return { data: result.data };
    } catch (err) {
      const axiosErr = err as AxiosError;
      return {
        error: {
          status: axiosErr.response?.status,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: axiosErr.response?.data,
        },
      };
    }
  };
};

export default axiosBaseQuery;

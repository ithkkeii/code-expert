import axios from 'axios';

axios.defaults.baseURL = 'https://codeexpert.dev';

const httpService = {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  get: axios.get,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  post: axios.post,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  put: axios.put,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  delete: axios.delete,
};

export default httpService;

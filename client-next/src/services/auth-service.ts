import httpService from '@/src/services/http-service';

const signIn = (body: { email: string; password: string }) => {
  return httpService.post('/api/v1/users/sign-in', body);
};

const authService = {
  signIn,
};

export default authService;

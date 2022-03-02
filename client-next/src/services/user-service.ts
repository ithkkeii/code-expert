export interface SignInInfo {
  name: string;
  email: string;
  password: string;
}

const signIn = (signInInfo: SignInInfo) => {};

const userService = {
  signIn,
};

export default userService;

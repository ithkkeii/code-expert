import jwt from 'jsonwebtoken';

declare global {
  var getAuthCookies: () => Promise<string[]>;
}

// NOTE: this function is only be able to use in testing environment
// we're declare it in setupFilesAfterEnv file jest setting.
global.getAuthCookies = async (): Promise<string[]> => {
  const accessToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET_KEY!);

  const cookie = Buffer.from(JSON.stringify({ accessToken })).toString(
    'base64',
  );
  return [`session=${cookie}`];
};

import { z } from 'zod';

export const validateLoginInput = (email: unknown) => {
  z.string().email().parse(email);
};

import { User } from './generated/graphql';
import { User as UserEntity } from '@prisma/client';

export const mapUserToSchema = (user: UserEntity): User => {
  const { id } = user;

  return { id: String(id) };
};

export const mapUsersToSchema = (users: UserEntity[]): User[] =>
  users.map((user) => mapUserToSchema(user));

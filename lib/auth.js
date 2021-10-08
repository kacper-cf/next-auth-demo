import { compare, hash } from "bcrypt";

export const hashPassowrd = async (password) => {
  return hash(password, 8);
};

export const verifyPassword = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};

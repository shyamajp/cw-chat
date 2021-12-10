import { User } from "./User.js";

let myUser;

export const getUser = () => {
  return myUser;
};

export const createUser = (name, room) => {
  myUser = new User(name, room);
  return myUser;
};

import { User } from "../classes/User.js";

let myUser;

/**
 * Returns current user
 * @returns {User} current user
 */
export const getUser = () => {
  return myUser;
};

/**
 * Returns newly created user
 * @param  {string} name
 * @param  {string} room
 */
export const createUser = (name, room) => {
  myUser = new User(name, room);
  return myUser;
};

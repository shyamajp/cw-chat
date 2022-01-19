const users = [];

const addUser = (id, name, room) => {
  const existingUser = users.find((user) => user.name.trim().toLowerCase() === name.trim().toLowerCase());

  if (existingUser) return { error: "Username has already been taken" };
  if (!name && !room) return { error: "Username and room are required" };
  if (!name) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  if (!/^[a-z0-9_-]+$/i.test(name)) return { error: "Username can only contain alphanumeric characters or a few special characters(_ and -)" };
  if (!/^[a-z0-9_-]+$/i.test(room)) return { error: "Room can only contain alphanumeric characters or a few special characters(_ and -)" };

  if (name.length > 12) return { error: "Name cannot be longer than 12 characters" };
  if (room.length > 18) return { error: "Room cannot be longer than 18 characters" };

  const user = { id, name, room };
  users.push(user);
  return { user };
};

const getUser = (id) => {
  const user = users.find((user) => user.id == id);
  return user;
};

const updateUser = (id, obj) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...obj };
  }
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsers = (room) => users.filter((user) => user.room === room);

exports.addUser = addUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;

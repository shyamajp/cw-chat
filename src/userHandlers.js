const users = [];

const addUser = (id, name, room, frequency) => {
  const existingUser = users.find((user) => user.name.trim().toLowerCase() === name.trim().toLowerCase());

  if (existingUser) return { error: "Username has already been taken" };
  if (!name && !room) return { error: "Username and room are required" };
  if (!name) return { error: "Username is required" };
  if (!room) return { error: "Room is required" };

  const user = { id, name, room, frequency };
  users.push(user);
  return { user };
};

const getUser = (id) => {
  const user = users.find((user) => user.id == id);
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsers = (room) => users.filter((user) => user.room === room);

exports.addUser = addUser;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;

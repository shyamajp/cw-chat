const { addUser, getUser, updateUser, deleteUser, getUsers } = require("./userHandlers");

beforeEach(() => {
  window.users = [{ id: "user-id", name: "user-name", room: "user-room" }];
});

afterAll(() => {
  delete window.users;
});

describe("addUser", () => {
  const id = "test-id";
  const name = "test-name";
  const room = "test-room";

  test("Username is taken", () => {
    expect(addUser(id, "user-name", room)).toMatchObject({ error: "Username has already been taken" });
  });

  test("Username and room are missing", () => {
    expect(addUser(id, "", "")).toMatchObject({ error: "Username and room are required" });
  });

  test("Username is missing", () => {
    expect(addUser(id, "", room)).toMatchObject({ error: "Username is required" });
  });

  test("Room is missing", () => {
    expect(addUser(id, name, "")).toMatchObject({ error: "Room is required" });
  });

  test("Username contains illegal characters", () => {
    expect(addUser(id, "@illegal-name", room)).toMatchObject({ error: "Username can only contain alphanumeric characters or a few special characters(_ and -)" });
  });

  test("Room contains illegal characters", () => {
    expect(addUser(id, name, "@illegal-room")).toMatchObject({ error: "Room can only contain alphanumeric characters or a few special characters(_ and -)" });
  });

  test("Username is too long", () => {
    expect(addUser(id, "xxxxxxxxxxxxx", room)).toMatchObject({ error: "Username cannot be longer than 12 characters" });
  });

  test("Username is too long", () => {
    expect(addUser(id, name, "xxxxxxxxxxxxxxxxxxx")).toMatchObject({ error: "Room cannot be longer than 18 characters" });
  });

  test("Username and room are valid", () => {
    expect(addUser(id, name, room)).toMatchObject({ user: { id, name, room } });
    expect(window.users.length).toBe(2);
  });
});

describe("getUser", () => {
  test("User does not exist", () => {
    expect(getUser("no-id")).toBeUndefined();
  });

  test("User exists", () => {
    expect(getUser("user-id")).toMatchObject({ id: "user-id", name: "user-name", room: "user-room" });
  });
});

describe("deleteUser", () => {
  test("User does not exist", () => {
    expect(deleteUser("no-id")).toBeUndefined();
  });

  test("User exists", () => {
    expect(deleteUser("user-id")).toMatchObject({ id: "user-id", name: "user-name", room: "user-room" });
  });
});

describe("updateUser", () => {
  test("User does not exist", () => {
    expect(updateUser("no-id", { mode: "receive" })).toBeUndefined();
  });

  test("User exists", () => {
    expect(updateUser("user-id", { mode: "receive" })).toMatchObject({ id: "user-id", name: "user-name", room: "user-room", mode: "receive" });
  });
});

describe("getUsers", () => {
  test("Room does not exist", () => {
    expect(getUsers("no-room")).toMatchObject([]);
  });

  test("Room exists", () => {
    expect(getUsers("user-room")).toMatchObject([{ id: "user-id", name: "user-name", room: "user-room" }]);
  });
});

const { getRooms } = require("./utils");

beforeEach(() => {
  window.rooms = new Map([["current-room", new Set(["current-user"])]]);
});

afterEach(() => {
  delete window.rooms;
});

describe("getRooms", () => {
  test("No rooms", () => {
    expect(getRooms(new Map([]))).toEqual([]);
  });

  test("Single user in room", () => {
    expect(getRooms(rooms)).toEqual([{ room: "current-room", size: 1 }]);
  });

  test("Multiple users in room", () => {
    rooms.set("another-room", new Set(["user-one", "user-two"]));
    expect(getRooms(rooms)).toEqual([
      { room: "current-room", size: 1 },
      { room: "another-room", size: 2 },
    ]);
  });

  test("Room number max out", () => {
    rooms.set("very-long-room-with-20+-chars", new Set(["invalid-user"]));
    expect(getRooms(rooms)).toEqual([{ room: "current-room", size: 1 }]);
  });
});

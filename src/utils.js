const getRooms = (roomSet) => {
  const rooms = [];
  Array.from(roomSet.keys()).map((room) => {
    if (room.length < 20) rooms.push(room);
  });
  return rooms;
};

exports.getRooms = getRooms;

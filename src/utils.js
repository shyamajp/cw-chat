const getRooms = (roomSet) => {
  const rooms = [];
  Array.from(roomSet.keys()).map((room) => {
    if (room.length < 20) {
      const size = roomSet.get(room).size;
      rooms.push({ room, size });
    }
  });
  return rooms;
};

exports.getRooms = getRooms;

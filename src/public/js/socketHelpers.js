import socket from "./socket.js";
import { START_SOUND, STOP_SOUND } from "./constants.js";
import { EventName } from "./types.js";
import { getUser } from "./userHelpers.js";

export const emitMessage = (start = true) => {
  const { transmit } = getUser();
  if (!transmit) return;
  socket.emit(EventName.Message, start ? START_SOUND : STOP_SOUND);
};

export const emitLogin = (room, name) => {
  socket.emit(EventName.Login, { room, name });
};

export const emitMode = (mode) => {
  socket.emit(EventName.Mode, mode);
};

export const emitSettings = (frequency) => {
  socket.emit(EventName.Settings, frequency);
};

export const receiveError = () => {
  return new Promise((resolve) =>
    socket.on(EventName.Error, (error) => {
      resolve(error);
    })
  );
};

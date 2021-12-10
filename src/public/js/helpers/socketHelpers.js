import socket from "../socket.js";
import { START_SOUND, STOP_SOUND } from "../constants.js";
import { EventName, ModeTypes } from "../types.js";
import { getUser } from "./userHelpers.js";

/**
 * Emits morse code in text to server
 * @param  {boolean} [start=true] interpreted as "d" or "u"
 */
export const emitMessage = (start = true) => {
  const { transmit } = getUser();
  if (!transmit) return;
  socket.emit(EventName.Message, start ? START_SOUND : STOP_SOUND);
};

/**
 * Emits room and name on login to server
 * @param  {string} room
 * @param  {string} name
 */
export const emitLogin = (room, name) => {
  socket.emit(EventName.Login, { room, name });
};

/**
 * Emits user mode to server
 * @param  {boolean} [transmit=true] interpreted as "transmit" or "receive"
 */
export const emitMode = (transmit = true) => {
  socket.emit(EventName.Mode, transmit ? ModeTypes.Transmit : ModeTypes.Receive);
};

/**
 * Emits user frequency to server
 * @param  {string} frequency
 */
export const emitSettings = (frequency) => {
  socket.emit(EventName.Settings, frequency);
};

/**
 * Returns error message or empty message after login from server
 * @returns {Promise<string>}
 */
export const receiveError = () => {
  return new Promise((resolve) =>
    socket.on(EventName.Error, (error) => {
      resolve(error);
    })
  );
};

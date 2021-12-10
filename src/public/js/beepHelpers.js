import { EventName } from "./types.js";

let myBeep;
let otherBeeps = {};

export const getMyBeep = () => {
  return myBeep;
};

export const setMyBeep = (beep) => {
  myBeep = beep;
};

export const getOtherBeep = (id) => {
  return otherBeeps[id];
};

export const setOtherBeep = (id, beep) => {
  otherBeeps[id] = beep;
};

export const stopAllOtherBeeps = () => {
  Object.values(otherBeeps).forEach((beep) => {
    beep.stop();
  });
};

export const startBeep = (beep, socket, transmit = true) => {
  if (transmit) {
    socket.emit(EventName.Message, "d");
  }
  setMyBeep(beep);
  beep.play();
};

export const stopBeep = (beep, socket, transmit = true) => {
  if (transmit) {
    socket.emit(EventName.Message, "u");
  }
  beep.stop();
};

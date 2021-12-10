import socket from "./socket.js";
import { startBeep, stopBeep } from "./beepHelpers.js";
import { EventName, KeyTypes } from "./types.js";
import { getUser } from "./userHelpers.js";

let i;

let STRAIGHT_KEY = " ";
let DOT_KEY = "k";
let DASH_KEY = "l";

const START_SOUND = "d";
const STOP_SOUND = "u";

/* NOTE: DOT:DASH:PAUSE = 1:3:1 */

export const handleKeyUp = (e) => {
  const keyType = getUser()?.keyType;
  if (!getUser()) return;
  if (keyType === KeyTypes.Paddle) {
    if (e.key === DOT_KEY || e.key === DASH_KEY) {
      stopBeep();
      clearInterval(i);
      i = undefined;
    }
  } else {
    if (keyType === KeyTypes.Straight && e.key === STRAIGHT_KEY) {
      stopBeep();
      transmit && socket.emit(EventName.Message, STOP_SOUND);
    }
  }
};

function dot() {
  const user = getUser();
  if (!user) return;
  const transmit = user.transmit;
  transmit && socket.emit(EventName.Message, START_SOUND);
  startBeep(user.frequency);
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, STOP_SOUND);
    stopBeep();
  }, user.speed);
  return dot;
}

function dash() {
  const user = getUser();
  if (!user) return;
  const transmit = user.transmit;
  transmit && socket.emit(EventName.Message, START_SOUND);
  startBeep(user.frequency);
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, STOP_SOUND);
    stopBeep();
  }, user.speed * 3);
  return dash;
}

export const handleKeyDown = (e) => {
  const user = getUser();
  if (!user) return;
  if (user.keyType === KeyTypes.Paddle) {
    if (e.key === DOT_KEY && !e.repeat && !i) {
      i = setInterval(dot(), user.speed * 2);
      return;
    } else if (e.key === DASH_KEY && !e.repeat && !i) {
      i = setInterval(dash(), user.speed * 4);
      return;
    }
  } else {
    if (e.key === STRAIGHT_KEY && !e.repeat) {
      user.transmit && socket.emit(EventName.Message, START_SOUND);
      startBeep(user.frequency);
      return;
    }
  }
};

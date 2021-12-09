import { Beep, getMyBeep, setMyBeep } from "./beep.js";
import { EventName } from "./types.js";
import { socket } from "./socket.js";
import { getUser } from "./user.js";

let i;

let STRAIGHT_KEY = " ";
let DOT_KEY = "k";
let DASH_KEY = "l";

const START_SOUND = "d";
const STOP_SOUND = "u";

/* NOTE: DOT:DASH:PAUSE = 1:3:1 */

export const handleKeyUp = (e) => {
  const beep = getMyBeep();
  // straight
  if (!getUser()) return;
  if (e.key === STRAIGHT_KEY) {
    beep.stop();
    transmit && socket.emit(EventName.Message, STOP_SOUND);
  }
  // paddle
  else if (e.key === DOT_KEY || e.key === DASH_KEY) {
    beep.stop();
    clearInterval(i);
    i = undefined;
  }
};

function dot() {
  const user = getUser();
  if (!user) return;
  const transmit = user.transmit;
  transmit && socket.emit(EventName.Message, START_SOUND);
  const beep = new Beep(user.frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, STOP_SOUND);
    beep.stop();
  }, user.speed);
  return dot;
}

function dash() {
  const user = getUser();
  if (!user) return;
  const transmit = user.transmit;
  transmit && socket.emit(EventName.Message, START_SOUND);
  const beep = new Beep(user.frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, STOP_SOUND);
    beep.stop();
  }, user.speed * 3);
  return dash;
}

export const handleKeyDown = (e) => {
  const user = getUser();
  if (!user) return;
  // straight
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    user.transmit && socket.emit(EventName.Message, START_SOUND);
    setMyBeep(new Beep(user.frequency));
    getMyBeep().play();
  }
  // dot
  else if (e.key === DOT_KEY && !e.repeat && !i) {
    i = setInterval(dot(), user.speed * 2);
  }
  // dash
  else if (e.key === DASH_KEY && !e.repeat && !i) {
    i = setInterval(dash(), user.speed * 4);
  }
};

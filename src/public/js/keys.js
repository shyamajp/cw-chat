import { Beep, getMyBeep, setMyBeep } from "./beep.js";
import { EventName } from "./types.js";
import { socket } from "./socket.js";
import { getUser } from "./user.js";

let i;

let STRAIGHT_KEY = " ";
let DOT_KEY = "k";
let DASH_KEY = "l";

let DOT_LENGTH = 100;
let DASH_LENGTH = DOT_LENGTH * 3;
let PAUSE_LENGTH = DOT_LENGTH;

export const handleKeyUp = (e) => {
  const beep = getMyBeep();
  // straight
  if (e.key === STRAIGHT_KEY) {
    beep.stop();
    transmit && socket.emit(EventName.Message, "u");
  }
  // paddle
  else if (e.key === DOT_KEY || e.key === DASH_KEY) {
    beep.stop();
    clearInterval(i);
    i = undefined;
  }
};

function dot() {
  const transmit = getUser().transmit;
  transmit && socket.emit(EventName.Message, "d");
  const beep = new Beep(getUser().frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    beep.stop();
  }, DOT_LENGTH);
  return dot;
}

function dash() {
  const transmit = getUser().transmit;
  transmit && socket.emit(EventName.Message, "d");
  const beep = new Beep(getUser().frequency);
  setMyBeep(beep);
  beep.play();
  setTimeout(() => {
    transmit && socket.emit(EventName.Message, "u");
    beep.stop();
  }, DASH_LENGTH);
  return dash;
}

export const handleKeyDown = (e) => {
  const user = getUser();
  // straight
  if (e.key === STRAIGHT_KEY && !e.repeat) {
    user.transmit && socket.emit(EventName.Message, "d");
    setMyBeep(new Beep(user.frequency));
    getMyBeep().play();
  }
  // dot
  else if (e.key === DOT_KEY && !e.repeat && !i) {
    i = setInterval(dot(), DOT_LENGTH + PAUSE_LENGTH);
  }
  // dash
  else if (e.key === DASH_KEY && !e.repeat && !i) {
    i = setInterval(dash(), DASH_LENGTH + PAUSE_LENGTH);
  }
};

import { startBeep, stopBeep } from "./beepHelpers.js";
import { KeyTypes } from "./types.js";
import { getUser } from "./userHelpers.js";
import { emitMessage } from "./socketHelpers.js";

let i;

let STRAIGHT_KEY = " ";
let DOT_KEY = "k";
let DASH_KEY = "l";

/* NOTE: DOT:DASH:PAUSE = 1:3:1 */

export const handleKeyUp = (e) => {
  const { keyType } = getUser() || {};
  if (!getUser()) return;
  if (keyType === KeyTypes.Paddle) {
    if (e.key === DOT_KEY || e.key === DASH_KEY) {
      emitMessage(false);
      stopBeep();
      clearInterval(i);
      i = undefined;
    }
  } else {
    if (keyType === KeyTypes.Straight && e.key === STRAIGHT_KEY) {
      emitMessage(false);
      stopBeep();
    }
  }
};

function dot() {
  const { frequency, speed } = getUser();
  emitMessage(true);
  startBeep(frequency);
  setTimeout(() => {
    emitMessage(false);
    stopBeep();
  }, speed);
  return dot;
}

function dash() {
  const { frequency, speed } = getUser();
  emitMessage(true);
  startBeep(frequency);
  setTimeout(() => {
    emitMessage(false);
    stopBeep();
  }, speed * 3);
  return dash;
}

export const handleKeyDown = (e) => {
  const { keyType, speed, frequency } = getUser() || {};
  if (!keyType) return;
  if (keyType === KeyTypes.Paddle) {
    if (e.key === DOT_KEY && !e.repeat && !i) {
      i = setInterval(dot(), speed * 2);
      return;
    } else if (e.key === DASH_KEY && !e.repeat && !i) {
      i = setInterval(dash(), speed * 4);
      return;
    }
  } else {
    if (e.key === STRAIGHT_KEY && !e.repeat) {
      emitMessage(true);
      startBeep(frequency);
      return;
    }
  }
};

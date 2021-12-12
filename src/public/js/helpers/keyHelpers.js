import { KeyTypes } from "../types.js";
import { startBeep, stopBeep } from "./beepHelpers.js";
import { getUser } from "./userHelpers.js";
import { emitMessage } from "./socketHelpers.js";

let i;

/* NOTE: DOT:DASH:PAUSE = 1:3:1 */
let STRAIGHT_KEY = " ";
let DOT_KEY = "ArrowLeft";
let DASH_KEY = "ArrowRight";

function repeat(n) {
  const { frequency, speed } = getUser();
  emitMessage(true);
  startBeep(frequency);
  setTimeout(() => {
    emitMessage(false);
    stopBeep();
  }, speed * n);
}

function dot() {
  repeat(1);
  return dot;
}

function dash() {
  repeat(3);
  return dash;
}
/**
 * Makes beep on right keys when user is logged in
 * @param  {KeyboardEvent} e
 */
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
      // disable scrolling down
      e.preventDefault();
      emitMessage(true);
      startBeep(frequency);
      return;
    }
  }
};

/**
 * Stops beep on right keys when user is logged in
 * @param  {KeyboardEvent} e
 */
export const handleKeyUp = (e) => {
  const { keyType } = getUser() || {};
  if (!keyType) return;
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

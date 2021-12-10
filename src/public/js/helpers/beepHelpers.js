import { Beep } from "../classes/Beep.js";

let myBeep;
let otherBeeps = {};

/**
 * Starts beep of frequency
 * When id is passed, user with id starts beeping
 * When id is not passed, current user starts beeping
 * @param  {string} frequency
 * @param  {string} [id]
 */
export const startBeep = (frequency, id) => {
  if (id) {
    otherBeeps[id] = new Beep(frequency);
    otherBeeps[id].start();
  } else {
    myBeep = new Beep(frequency);
    myBeep.start();
  }
};

/**
 * Stops beep
 * When id is passed, user with id stops beeping
 * When id is not passed, current user stops beeping
 * @param  {string} [id]
 */
export const stopBeep = (id) => {
  if (id) {
    otherBeeps[id]?.stop();
    delete otherBeeps[id];
  } else {
    myBeep?.stop();
  }
};

/**
 * Stops all beeps of others
 */
export const stopAllBeeps = () => {
  Object.values(otherBeeps).forEach((beep) => {
    beep.stop();
  });
};

import { Beep } from "./Beep.js";

let myBeep;
let otherBeeps = {};

export const startBeep = (frequency, id) => {
  if (id) {
    otherBeeps[id] = new Beep(frequency);
    otherBeeps[id].start();
  } else {
    myBeep = new Beep(frequency);
    myBeep.start();
  }
};

export const stopBeep = (id) => {
  if (id) {
    otherBeeps[id]?.stop();
  } else {
    myBeep?.stop();
  }
};

export const stopAllBeeps = () => {
  Object.values(otherBeeps).forEach((beep) => {
    beep.stop();
  });
};

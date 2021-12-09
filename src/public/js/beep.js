import { EventName } from "./types.js";

let myBeep;
let otherBeeps = {};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
export class Beep {
  constructor(frequency = 400) {
    this._frequency = frequency;
    this._oscillator = audioContext.createOscillator();
  }

  play() {
    this._oscillator.type = "sine";
    this._oscillator.frequency.value = this._frequency;
    this._oscillator.connect(audioContext.destination);
    this._oscillator.start();
  }

  stop() {
    this._oscillator.stop();
  }
}

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

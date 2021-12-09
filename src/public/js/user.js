let myUser;

const DEFAULT_FREQUENCY = 440;
const DEFAULT_SPEED = 100;

export class User {
  constructor(name, room, frequency, speed = DEFAULT_SPEED) {
    this._name = name;
    this._room = room;
    this._frequency = frequency;
    this._speed = speed;
    this._error = null;
    this._transmit = false;
  }

  get frequency() {
    return this._frequency || DEFAULT_FREQUENCY;
  }

  set frequency(val) {
    // TODO: add validation
    this._frequency = val;
  }

  get speed() {
    return this._speed || DEFAULT_FREQUENCY;
  }

  set transmit(val) {
    // TODO: add validation
    this._transmit = val;
  }

  get transmit() {
    return this._transmit;
  }

  set speed(val) {
    // TODO: add validation
    this._speed = val;
  }

  get error() {
    return this._error;
  }

  set error(val) {
    // TODO: add validation
    this._error = val;
  }
}

export const getUser = () => {
  return myUser;
};

export const setUser = (user) => {
  myUser = user;
};

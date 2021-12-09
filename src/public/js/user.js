let myUser;

const DEFAULT_FREQUENCY = 440;
const DEFAULT_SPEED = 100;

export class User {
  constructor(name, room, frequency, speed = DEFAULT_SPEED) {
    this._name = name;
    this._room = room;
    this._frequency = frequency;
    this._speed = speed;
    this._transmit = false;
  }

  get frequency() {
    return this._frequency || DEFAULT_FREQUENCY;
  }

  set frequency(val) {
    if (typeof val !== "number") {
      this._frequency = DEFAULT_FREQUENCY;
    } else if (val >= 440 && val <= 1600) {
      this._frequency = DEFAULT_FREQUENCY;
    } else {
      this._frequency = val;
    }
  }

  get speed() {
    return this._speed || DEFAULT_FREQUENCY;
  }

  set transmit(val) {
    if (typeof val !== "boolean") {
      this._transmit = false;
    } else {
      this._transmit = val;
    }
  }

  get transmit() {
    return this._transmit;
  }

  set speed(val) {
    if (typeof val !== "number") {
      this._speed = DEFAULT_SPEED;
    } else if (val >= 50 && val <= 200) {
      this._speed = DEFAULT_SPEED;
    } else {
      this._speed = val;
    }
  }
}

export const getUser = () => {
  return myUser;
};

export const setUser = (user) => {
  myUser = user;
};

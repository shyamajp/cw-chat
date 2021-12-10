import { KeyTypes } from "./types.js";
import { DEFAULT_FREQUENCY, DEFAULT_SPEED, DEFAULT_KEY_TYPE } from "./constants.js";
export class User {
  constructor(name, room, frequency = DEFAULT_FREQUENCY, speed = DEFAULT_SPEED) {
    this._name = name;
    this._room = room;
    this._frequency = frequency;
    this._speed = speed;
    this._transmit = false;
    this._keyType = DEFAULT_KEY_TYPE;
  }

  get frequency() {
    return this._frequency || DEFAULT_FREQUENCY;
  }

  set frequency(val) {
    if (val >= 440 && val <= 1600) {
      this._frequency = val;
    } else {
      this._frequency = DEFAULT_FREQUENCY;
    }
  }

  get speed() {
    return this._speed || DEFAULT_FREQUENCY;
  }

  set speed(val) {
    if (val >= 50 && val <= 200) {
      this._speed = val;
    } else {
      this._speed = DEFAULT_FREQUENCY;
    }
  }

  get transmit() {
    return this._transmit || false;
  }

  set transmit(val) {
    if (typeof val !== "boolean") {
      this._transmit = false;
    } else {
      this._transmit = val;
    }
  }

  get keyType() {
    return this._keyType || DEFAULT_KEY_TYPE;
  }

  set keyType(val) {
    if (val === KeyTypes.Paddle) {
      this._keyType = KeyTypes.Paddle;
    } else {
      this._keyType = DEFAULT_KEY_TYPE;
    }
  }
}

const socket = io();
import { stopBeep, startBeep } from "./beepHelpers.js";
import { START_SOUND, STOP_SOUND } from "./constants.js";
import { EventName } from "./types.js";
import { getUser } from "./userHelpers.js";

socket.on(EventName.Message, (message) => {
  const { id, text, frequency } = message;
  const { transmit } = getUser() || {};

  if (!transmit) {
    if (text === START_SOUND) {
      startBeep(frequency, id);
    } else if (text === STOP_SOUND) {
      stopBeep(id);
    }
  }
});

export default socket;

import { handleKeyUp, handleKeyDown } from "./js/keyHelpers.js";

window.onload = () => {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
};

window.onunload = () => {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
};

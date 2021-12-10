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

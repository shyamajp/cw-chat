const audioContext = new (window.AudioContext || window.webkitAudioContext)();
export class Beep {
  constructor(frequency = 880) {
    this.frequency = frequency;
    this.oscillator = audioContext.createOscillator();
  }

  init() {
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = this.frequency;
    this.oscillator.connect(audioContext.destination);
  }

  play() {
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop();
  }
}

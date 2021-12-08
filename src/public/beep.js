export class Beep {
  constructor(frequency = 880) {
    this.frequency = frequency;
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
  }

  init() {
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = this.frequency;

    this.oscillator.connect(this.audioContext.destination);
    this.oscillator.start();
    this.audioContext.suspend();
  }

  play() {
    this.audioContext.resume();
  }

  stop() {
    this.audioContext.suspend();
  }
}

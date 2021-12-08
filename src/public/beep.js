const audioContext = new (window.AudioContext || window.webkitAudioContext)();
export class Beep {
  constructor(frequency = 400) {
    this.frequency = frequency;
    this.oscillator = audioContext.createOscillator();
  }

  play() {
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = this.frequency;
    this.oscillator.connect(audioContext.destination);
    this.oscillator.start();
  }

  stop() {
    this.oscillator.stop();
  }
}

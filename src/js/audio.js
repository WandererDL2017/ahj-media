export default class Audio {
  constructor() {
    this.start = document.createElement('button');
    this.stop = document.createElement('button');
    this.audioChunks = [];
  }

  startRecord(mediaRecorder) {
    this.start.addEventListener('click', () => {
      mediaRecorder.start();
    });
  }

  stopRecord(mediaRecorder) {
    this.stop.addEventListener('click', () => {
      mediaRecorder.stop();
    });
  }

  recordAudio(mediaRecorder, audioRecord) {
    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(this.audioChunks, {
        type: 'audio/wav',
      });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = document.createElement('audio');
      audio.src = audioUrl;
      audio.controls = true;
      audio.autoplay = true;
      audioRecord.appendChild(audio);
      this.audioChunks = [];
    });
  }

  addRecord(mediaRecorder) {
    mediaRecorder.addEventListener('dataavailable', (event) => {
      this.audioChunks.push(event.data);
    });
  }

  createAudio(audioRecord) {
    this.start.setAttribute('id', 'start');
    this.start.textContent = 'start';
    this.stop.setAttribute('id', 'stop');
    this.stop.textContent = 'stop';

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        this.startRecord(mediaRecorder);
        this.addRecord(mediaRecorder);
        this.recordAudio(mediaRecorder, audioRecord);
        this.stopRecord(mediaRecorder);
      });
  }
}

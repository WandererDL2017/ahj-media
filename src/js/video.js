export default class Video {
  constructor() {
    this.start = document.createElement('button');
    this.stop = document.createElement('button');
    this.videoChunks = [];
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

  recordVideo(mediaRecorder, videoRecord) {
    mediaRecorder.addEventListener('stop', () => {
      const videoBlob = new Blob(this.videoChunks);
      const videoUrl = URL.createObjectURL(videoBlob);
      const video = document.createElement('video');
      video.src = videoUrl;
      video.controls = true;
      video.autoplay = true;
      videoRecord.appendChild(video);
      this.videoChunks = [];
    });
  }

  addRecord(mediaRecorder) {
    mediaRecorder.addEventListener('dataavailable', (event) => {
      this.videoChunks.push(event.data);
    });
  }

  createVideo(videoRecord) {
    this.start.setAttribute('id', 'startVideo');
    this.start.textContent = 'start';
    this.stop.setAttribute('id', 'stopVideo');
    this.stop.textContent = 'stop';

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        this.startRecord(mediaRecorder);
        this.addRecord(mediaRecorder);
        this.recordVideo(mediaRecorder, videoRecord);
        this.stopRecord(mediaRecorder);
      });
  }
}

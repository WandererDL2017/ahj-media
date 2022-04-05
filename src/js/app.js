import Audio from './audio';
import Video from './video';

const example = document.querySelector('.example');
const audio = new Audio();
const video = new Video();
const audioRecord = document.createElement('div');
const videoRecord = document.createElement('div');
audioRecord.setAttribute('id', 'audio');
videoRecord.setAttribute('id', 'video');

example.appendChild(audioRecord);
example.appendChild(audio.start);
example.appendChild(audio.stop);

example.appendChild(videoRecord);
example.appendChild(video.start);
example.appendChild(video.stop);

audio.createAudio(example);
video.createVideo(example);

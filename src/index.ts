import simepleGrey from './filters/simple-grey';

const video = document.getElementById('video') as HTMLVideoElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const constraints = {
  video: true,
  audio: false,
}
navigator.mediaDevices.getUserMedia(constraints)
  .then(function (stream) {
    if (!video) return;

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();

      const { videoWidth, videoHeight } = video;
      const displayWidth = video.width;
      const displayHeight = displayWidth * videoHeight / videoWidth;
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    });
  })
  .catch(function (err) {
    console.log(err.name + ': ' + err.message);
  });

// canvas 重绘 video
video.addEventListener('play', function () {
  const self = this;

  function loop() {
    if (!self.paused && !self.ended ) {
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;

      ctx!.drawImage(self, 0, 0, width, height);
      const canvasData = ctx!.getImageData(0, 0, width, height);
      const processedCanvasData = simepleGrey(canvasData);
      ctx!.putImageData(processedCanvasData, 0, 0);

      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
});

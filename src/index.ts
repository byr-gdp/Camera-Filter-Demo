/**
 * 遍历 filters 目录下所有文件，并挂载在 filters 上，key 经处理后的文件名。
 */
const filters: { [key: string]: any } = {};
const context = require.context('./filters/', false, /\.ts$/);
context.keys().forEach(key => {
  const start = key.indexOf('./');
  const end = key.lastIndexOf('.ts');
  const name = key.slice(start + 2, end);
  filters[name] = context(key).default;
});

const video = document.getElementById('video') as HTMLVideoElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const anotherCanvas = document.getElementById('anotherCanvas') as HTMLCanvasElement;

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

      anotherCanvas.width = displayWidth;
      anotherCanvas.height = displayHeight;
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
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const ctx2 = anotherCanvas.getContext('2d');
      const { width, height } = canvas;

      ctx!.drawImage(self, 0, 0, width, height);
      ctx2!.drawImage(self, 0, 0, width, height);
      const canvasData = ctx!.getImageData(0, 0, width, height);
      const anotherCanvasData = ctx2!.getImageData(0, 0, width, height);
      const processedCanvasData = filters.simpleGrey(canvasData);
      const processedAnotherCanvasData = filters.anotherGrey(anotherCanvasData);
      ctx!.putImageData(processedCanvasData, 0, 0);
      ctx2!.putImageData(processedAnotherCanvasData, 0, 0);

      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
});

interface ICanvasData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export default function filter(canvasData: ICanvasData): ICanvasData {
  // 滤镜本质就是处理 canvas
  for (let x = 0; x < canvasData.width; x++) {
    for (let y = 0; y < canvasData.height; y++) {
      const idx = (x + y * canvasData.width) * 4;
      const r = canvasData.data[idx];
      const g = canvasData.data[idx + 1];
      const b = canvasData.data[idx + 2];

      const grey = (r + g + b) / 3;

      canvasData.data[idx] = grey;
      canvasData.data[idx + 1] = grey;
      canvasData.data[idx + 2] = grey;
      canvasData.data[idx + 3] = 255;
    }
  }

  return canvasData;
}
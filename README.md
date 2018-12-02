# Camera Filter Demo

基于现有 API 调取摄像头，并实时获取原始画面并用 Canvas 重绘，实现若干种滤镜效果。

## Usage

- `npm i`
- `npm run dev`
- `open demo/index.html`

## Todo

- 常见滤镜算法，需要进一步找资料。
- 性能优化，比如放在 worker 计算，但目前性能有多差还无法量化。
- 工程：

  - 扫描目录收集 filter 函数。
  - 完善 tsconfig 配置。
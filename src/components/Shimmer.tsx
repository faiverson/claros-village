const Shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#D0D0D0" offset="20%" />
      <stop stop-color="#B4B4B4" offset="40%" />
      <stop stop-color="#E0E0E0" offset="60%" />
      <stop stop-color="#A8A8A8" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#c2c2c2" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

export default Shimmer

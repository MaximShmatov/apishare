import fs from 'fs';

fs.mkdirSync('build/addons/earcut/earcut.node', { recursive: true });
fs.createReadStream('src/addons/earcut/earcut.node')
  .pipe(fs.createWriteStream('build/addons/earcut/earcut.node'));
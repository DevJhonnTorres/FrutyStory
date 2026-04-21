const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'dist', 'client', 'assets');
const outDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(assetsDir)) {
  console.error('Assets directory not found:', assetsDir);
  process.exit(0);
}

const files = fs.readdirSync(assetsDir);
const jsFile = files.find((f) => f.startsWith('index-') && f.endsWith('.js')) || files.find((f) => f.endsWith('.js'));
const cssFile = files.find((f) => f.endsWith('.css'));

if (!jsFile) {
  console.error('No JS entry file found in assets');
}

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FrutyStory</title>
  ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : ''}
</head>
<body>
  <div id="root"></div>
  ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ''}
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log('Generated static index.html referencing', jsFile, cssFile);

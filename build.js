const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
  <title>Chef + Bolt.diy API Gateway</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>🍳🔩 Chef + Bolt.diy Merged API Gateway</h1>
  <p>Deployment successful on Cloudflare Pages!</p>
  <h2>Endpoints</h2>
  <ul>
    <li><strong>GET</strong> <code>/health</code> - Health check</li>
    <li><strong>POST</strong> <code>/api/unified/applications</code> - Generate app + infra from prompt</li>
  </ul>
  <h2>Test Health</h2>
  <pre><code>curl https://YOUR-PAGES-URL/health</code></pre>
  <h2>Test API</h2>
  <pre><code>curl -X POST https://YOUR-PAGES-URL/api/unified/applications \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "React app with Node backend"}'</code></pre>
  <p><a href="https://github.com/you3333ef/bolt.chef">Source Code</a></p>
</body>
</html>`;

const outDir = path.join(__dirname, 'build', 'client');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log('Build complete: created build/client/index.html');

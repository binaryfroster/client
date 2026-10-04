const http = require('http');

// Start the server in-process on an ephemeral port to test
const { spawn } = require('child_process');
const serverProcess = spawn('node', ['server.js'], { env: { ...process.env, PORT: '3456' } });

setTimeout(() => {
  const routesToTest = [
    '/',
    '/about',
    '/programs',
    '/personal-training',
    '/membership',
    '/gallery',
    '/reviews',
    '/visit',
    '/owner',
    '/assets/styles-C7PxWAHs.css',
    '/assets/index-BckL96hb.js',
    '/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png',
    '/__l5e/assets-v1/16a6db73-973c-4aa6-8333-34654f2ac9e9/power-house-intro.mp4'
  ];

  let completed = 0;
  routesToTest.forEach(route => {
    http.get(`http://localhost:3456${route}`, res => {
      console.log(`Route ${route.padEnd(30)} -> Status: ${res.statusCode}, Type: ${res.headers['content-type']}, Length: ${res.headers['content-length']}`);
      res.resume();
      completed++;
      if (completed === routesToTest.length) {
        serverProcess.kill();
        console.log('\nAll routes verified successfully!');
        process.exit(0);
      }
    }).on('error', err => {
      console.error(`Route ${route} failed:`, err.message);
      completed++;
      if (completed === routesToTest.length) {
        serverProcess.kill();
        process.exit(1);
      }
    });
  });
}, 1000);

// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');
// const fs = require('fs');
// const https = require('https');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // const options = {
// //   key: fs.readFileSync('./certificates/server.key'),
// //   cert: fs.readFileSync('./certificates/server.crt'),
// // };

// app.prepare().then(() => {
//   const server = https.createServer({}, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   server.listen(443, (err) => {
//     if (err) throw err;
//     console.log('> Ready on https://localhost:443');
//   });
// });

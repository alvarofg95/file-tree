const express = require('express');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
var corsOptions = {
  origin: ['http://localhost:3000'],
};
const server = express();
server.use(express.static('public'));
server.use(cors(corsOptions));

server.get('/find/*', (req, res) => {
  const { url } = req;
  const cleaneadUrl = url.replace('/find', 'public');
  fs.readdir(cleaneadUrl, function (err, content = []) {
    const parsedContent = content.map((item) => ({
      folder: fs.lstatSync(`${cleaneadUrl}/${item}`).isDirectory(),
      name: item,
      route: `${url.replace('/find/', '')}/${item}`,
    }));
    res.send(parsedContent);
  });
});

server.get('/', (req, res) => {
  const { url } = req;
  fs.readdir('public', function (err, content) {
    const parsedContent = content.map((item) => ({
      folder: fs.lstatSync(`public/${item}`).isDirectory(),
      name: item,
      route: `/${item}`,
    }));
    res.send(parsedContent);
  });
});

server.get('/download*', function (req, res) {
  const finalUrl = req.url.replace('/download', 'public');
  res.download(`${__dirname}/${finalUrl}`); // Set disposition and send it.
});

server.listen(PORT, (req) => {
  console.log(`Server listening on ${PORT}`);
});

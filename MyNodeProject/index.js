const http = require('http');

const handler = (req, res) => {
    console.log(req)
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Parv Gupta !\n');
}
const server = http.createServer(handler);


const port = 3000;
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});

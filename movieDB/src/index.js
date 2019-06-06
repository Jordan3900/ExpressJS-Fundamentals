const http = require('http');
const port = '6969';
const handlers = require('./handlers')

console.log('Server start...')
http.createServer((res, req) => {
   
    for (let handler of handlers) {
        if (!handler(res, req)) {
            break;
        }
    }
}).listen(port);
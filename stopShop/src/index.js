const http = require('http');
const port = '6969';
const handlers = require('./handlers')
console.log('server start at: '+ port)
http.createServer((res, req) => {
   
    for (let handler of handlers) {
        if (!handler(res, req)) {
            break;
        }
    }
}).listen(port);
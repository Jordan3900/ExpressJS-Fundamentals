const http = require('http');
const port = '6969';
const handlers = require('./handlers')

let enviroment = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config.js')

database(config[enviroment]);

console.log(`Server start at port: ${port}`)
http.createServer((res, req) => {
    for (let handler of handlers) {
        if (!handler(res, req)) {
            break;
        }
    }
}).listen(port);
const url = require('url');
const fs = require('fs');
const path = require('path');
const db = require('../config/dataBase');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {

        let filepath = path.normalize(path.join(__dirname, '../views/home.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found bro!')
                res.end();

                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        })

    } else if (req.pathname === '/viewAllMovies' && req.method === 'GET') {
        let filepath = path.normalize(path.join(__dirname, '../views/viewAll.html'));

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found bro!')
                res.end();

                return;
            }

            let content = '';

            for (const movie of db) {
                content += `<div class="movie">
                    <a href="/details?q=${movie.id}">
                        <img class="moviePoster" src="${movie.moviePoster}" alt=""/>
                    </a>
                    </div>`
            }

            let html = data.toString().replace('{{replaceMe}}', content);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();

        })
    } else {
        return true;
    }
}
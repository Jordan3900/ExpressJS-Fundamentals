const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const db = require('../config/dataBase');

function checkProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] != "")
            return true;
    }
    return false;
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/addMovie' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addMovie.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else if (req.pathname === '/addMovie' && req.method === 'POST') {
        let filePath = path.normalize(path.join(__dirname, '../views/addMovie.html'));

        let dataString = '';

        req.on('data', (data) => {
            dataString += data;
        });

        req.on('end', () => {
            let movie = qs.parse(dataString);

            fs.readFile(filePath, (err, data) => {
                let content = '';
                let html = '';
                if (checkProperties(movie) && !err) {

                    db.push(movie);

                    content = `<div id="successBox">
                            <h2 id="successMsg">Movie Added</h2>
                            </div>`;
                    html = data.toString().replace('{{replaceMe}}', content);

                    res.write(html);
                    res.end();
                } else {
                    content = `<div id="errBox">
                            <h2 id="errMsg">Please fill all fields</h2>
                            </div>`;
                    html = data.toString().replace('{{replaceMe}}', content);

                    res.write(html);
                    res.end();
                }
            });
        });
    } else if (req.pathname === '/details' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/details.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            let movieId = Number(url.parse(req.url, true).query.q);
            let movie = db.filter(x => x.id == movieId)[0];

            let content = `<div class="content">
            <img src="${movie.moviePoster}" alt="" />
            <h3>Title ${movie.movieTitle}</h3>
            <h3>Year ${movie.movieYear}</h3>
            <p> ${movie.movieDescription}</p>
          </div>`;
           let html = data.toString().replace('{{replaceMe}}', content);
            
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });
    } else {
        true;
    }
}
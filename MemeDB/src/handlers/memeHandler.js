const url = require('url');
var qs = require('querystring');
const fs = require('fs');
const path = require('path');
const db = require('../config/dataBase');
const multiparty = require('multiparty');
const shortid = require('shortid');

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../views/viewAll.html'));

    db.load().then(db => {
      fs.readFile(filepath, (err, data) => {
        if (err) {
          console.log(err);
        }

        let html = data.toString();
        let content = '';
        for (const meme of db) {
          content += `<div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>       
          </a>   
          </div>`;
        }

        html = html.replace('{{replaceMe}}', content);

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });

        res.write(html);
        res.end();
      });
    })

  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../views/addMeme.html'));

    fs.readFile(filepath, (err, data) => {
      if (err) {
        console.log(err);
      }

      let html = data.toString();

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      res.write(html);
      res.end();
    });

  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    let form = new multiparty.Form();
    let meme = {};

    form.on('error', function (err) {
      console.log('Error parsing form: ' + err.stack);
    });

    form.on('part', (part) => {
      if (part.filename) {
        let dataString = '';

        part.setEncoding('binary');
        part.on('data', (data) => {
          dataString += data;
        });

        part.on('end', () => {
          let fileName = shortid.generate() + '.png'
          let filePath = path.normalize(`./public/memeStorage/${fileName}`);

          meme.image = filePath;
          fs.writeFile(filePath, dataString, { encoding: 'ascii' }, (err) => {
            if (err) {
              console.log(err);
              return;
            }
          })
        })
      }
    });

    form.on('close', (err) => {
      console.log(err);
      res.writeHead(302, {
        Location: '/'
      });

      res.end();

    })
    form.parse(req);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    let filepath = path.normalize(path.join(__dirname, '../views/details.html'));

    db.load().then(db => {
      fs.readFile(filepath, (err, data) => {
        if (err) {
          console.log(err);
        }

        let id = qs.parse(url.parse(req.url).query).id;
        let html = data.toString();
        let meme = db.filter(x => x.id == id)[0];
        let content = `<div class="content">
        <img src="${meme.memeSrc}" alt=""/>
        <h3>Title ${meme.title}</h3>
        <p> ${meme.description}</p>
        </div>`;

        html = html.replace('{{replaceMe}}', content);

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });

        res.write(html);
        res.end();
      });
    })
  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')
  }
  else {
    return true
  }
}

const formidable = require('formidable');
const Image = require('mongoose').model('Image');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}

function addImage(req, res) {

const form = formidable.IncomingForm();

form.parse(req, (err, fields, files) => {
  if (err) {
    throw err;
  }
  const tags = fields.tagsId
                  .split(',')
                  .filter(x => x != '');

  Image.create({
    url: fields.imageUrl,
    description: fields.description,
    title: fields.imageTitle,
    images: [tags]
  }).then(tag => {
    res.writeHead(302, {
      Location: '/'
    });
    res.end();
  }).catch(err => {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.write('500 Server Error!');
    res.end();
  });

});

}
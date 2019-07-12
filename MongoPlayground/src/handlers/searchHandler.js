const url = require('url');
const Image = require('../models/ImageSchema');


module.exports = (req, res) => {
  if (req.pathname === '/search') {

    let afterDate = new Date(req.pathquery.afterDate);
    let beforeDate = new Date(req.pathquery.beforeDate);
    let limit = req.pathquery.limit || 10;
    let tags = req.pathquery.tagName
        .split(',')
        .filter(x => x !== '')
        .map(x => x.trim());


    var find = Image.find({creationDate: {$gt: afterDate, $lt:beforeDate}}).then(data => {
      datadebugger;
      console.log(data)
    })

  } else {
    return true
  }
}

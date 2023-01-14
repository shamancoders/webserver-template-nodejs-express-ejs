module.exports = function (req, res, callback) {
  var data = {
    title: 'Error',
    err: {
      name: req.query.code || '000',
      message: req.query.message || 'ERROR'
    }
  }
  callback(null, data)
}

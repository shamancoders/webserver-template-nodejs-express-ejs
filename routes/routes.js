
module.exports = (app) => {


  firstRoutes(app)

  pageRoutes(app)

  // app.use((req, res, next)=>{
  // 	res.status(404).json({ success:false, error:{code:'404',message:'function not found'}})
  // })

  // app.use((err,req, res)=>{
  // 	errorPage(req,res,err)
  // })

}


function firstRoutes(app) {
  app.all('/*', (req, res, next) => {
    next()
  })

  setRoutes(app, '/', (req, res, next) => {
    req.params['page'] = 'home'
    pageRoutesFunc(req,res)
  })
}


function setRoutes(app, route, cb1, cb2) {
  let params = route.split('/:')
  let yol = ''
  params.forEach((e, index) => {
    yol += index == 0 ? e : `/:${e}`

    if (cb2 != undefined) {
      app.all(yol, function (req, res, next) {

        cb1(req, res, next)
      }, cb2)
    } else {
      app.all(yol, function (req, res, next) {
        cb1(req, res, next)
      })
    }


  })
}


function pageRoutes(app) {
  setRoutes(app, '/:page/:func/:param1/:param2/:param3', pageRoutesFunc)

}

function pageRoutesFunc(req, res) {
  let pageFileName = path.join(__root, 'pages', req.params.page, `${req.params.page}.js`)
  if (!fs.existsSync(pageFileName))
    return errorPage404(req, res)

  require(pageFileName)(req, res, (err, data, view) => {
    if (!err) {
      setGeneralParams(req, res, data, (err, data) => {
        if (err)
          return errorPage(req, res, null)
        if (!data)
          data = {}

        if (view) {
          res.render(view, data)
        } else {
          let fileName = `${req.params.page}/${req.params.func || req.params.page}.ejs`
          if (fs.existsSync(path.join(__dirname, '../pages', fileName))) {

            res.render(fileName, data, (err, html) => {
              if (!err) {
                res.status(200).send(html)
              } else {
                errorPage(req, res, err)
              }
            })
          } else {
            errorPage404(req, res)
          }
        }
      })
    } else {
      return errorPage(req, res, err)
    }
  })
}

function setGeneralParams(req, res, data, cb) {
  data.urlPath = req.urlPath
  data.basePath = req.basePath
  data.currentPath = req.path
  data.url = req.url
  data.referer = req.referer

  // data.session = req.session || {}


  cb(null, data)
}

function errorPage(req, res, err) {
  let data = {}
  data['title'] = 'Hata'
  data['err'] = err || { code: 404, message: 'Sayfa bulunamadi' }

  setGeneralParams(req, res, data, (err, data2) => {
    if (!err) {
      //data2['leftMenu']=[]
    } else {
      data2 = data
    }

    res.render('error/error', data2)
  })
}

function errorPage404(req, res) {
  errorPage(req, res, { code: '404', message: `Sayfa veya fonksiyon bulunamadı. Func:${req.params.page}/${req.params.func || req.params.page}` })
}
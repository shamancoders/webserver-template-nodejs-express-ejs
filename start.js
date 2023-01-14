global.__root = __dirname



require('./lib/initialize-app')()
  .then(() => {
    require('./app')()
    console.log(`http://localhost:${process.env.PORT}`.green)
    if (process.env.NODE_ENV== 'development' && os.platform() == 'win32') {
      //require('child_process').exec(`explorer.exe http://localhost:${global.config.httpserver.port}`, (error, stdout, stderr) => { })
    }
  })
  .catch(console.error)
<p align="center">
  <img alt="miajs logo" src="assets/img/logo.png" width="100px" />
  <h3 align="center">MiaJS Web Server Template Documentation</h3>
</p>

# Web Server Template Nodejs + Expressjs + ejs


## Dependencies

This template has some dependencies shown below. But it is not using all of them, maybe in the future it may use them. 


`package.json`

```json
  "dependencies": {
    "atob": "^2.1.2",
    "body-parser": "^1.20.1",
    "btoa": "^1.2.1",
    "colors": "^1.4.0",
    "cookie-parser": "~1.4.4",
    "cors": "^2.8.5",
    "debug": "~2.6.9",
    "dotenv": "^16.0.3",
    "ejs": "~2.6.1",P
    "ejs-locals": "^1.0.2",
    "express": "~4.16.1",
    "express-session": "^1.17.3",
    "http-errors": "~1.6.3",
    "method-override": "^3.0.0",
    "morgan": "~1.9.1",
    "nodemailer": "^6.9.0",
    "nodemailer-smtp-transport": "^2.7.4",
    "serve-favicon": "^2.5.0",
    "use-strict": "^1.0.1"
  }

```

## Workspace File Structure

```yaml
.env    # process.env.{variables}
.gitignore

assets: # html assets
  - css
  - img
  - js
  - ....
lib:
  http-server.js      # Web Server
  initialize-app.js   # When the app starts, initializes global definitions
  mail.js
  moment.js
  util.js
node_modules:
pages:  #page views + controllers
  _common:
    - layout.ejs # main ejs file
    - header.ejs # part of layout.ejs
    - footer.ejs # part of layout.ejs
  home:   # URL default path / => /home
    - home.ejs # view file, includes _common/layout.ejs
    - home.js  # code file
  about:
    - about.ejs # view file, includes _common/layout.ejs
    - about.js  # code file
  error:
    - error.ejs # view file, includes _common/layout.ejs
    - error.js  # code file
routes:
  - routes.js   # /:page/:func/:param1/:param2/:param3

- app.js    # express app
- start.js  # start file

- package.json
- package-lock.json
- LICENSE   # MIT - License
- README.md
```

### File : `.env` Node Environment Settings

>**Required**:  **dotenv** package

#### `.env` example

```ini
NODE_ENV=development
PORT=3011
```

## Installation

- [Download](#download)
- [Cloning](#cloning)

### Download

1.  Download Zip File: <br />
  `https://github.com/shamancoders/webserver-template-nodejs-express-ejs/archive/refs/heads/main.zip`
2.  Extract zip file `webserver-template-nodejs-express-ejs-main.zip`

```cmd
cd webserver-template-nodejs-express-ejs

npm install
```


### Cloning

1.  SSH auth: <br />
  `git clone git@github.com:shamancoders/webserver-template-nodejs-express-ejs.git`
2.  HTTPS auth:<br/>
  `https://github.com/shamancoders/webserver-template-nodejs-express-ejs.git`
3.  GitHub CLI: <br/>
  `gh repo clone shamancoders/webserver-template-nodejs-express-ejs`

```cmd
cd webserver-template-nodejs-express-ejs

npm install
```

<br>
<br>
<br>
<p align="center">
  <img src="https://github.com/mouadTaoussi/learndev/blob/main/mercury/src/assets/LogoReadme.svg"/>
</p>
<h6 align="center">
	<strong>An app that allow developers to find the right resources for learning 😎</strong>
</h6>

#  Get Up and running in local env

## Note : Front-end and the Back-end are deployed separately (vercel-heroku).
<p>There are some of the configurations related to cors</p>

### Clone the repo

```
https://github.com/mouadTaoussi/learndev.git
```
```
cd learndev
```

### Install the dependencies

```
npm install
```

### Create ``.env`` file and add those elements within your credentiels below:

```
touch .env && nano .env
```
```
GITHUB_PUBLIC_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_PRIVATE_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_CALLBACK_URL = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGO_CONNECTION = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_LABS_HOST = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_LABS_PORT = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REDIS_LABS_PASSWORD = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PASS = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SESSION_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODE = development
PORT_DEV = 8000

```

### Edit ``venus/main.config.ts`` file
<p>You must edit this file to specify the front end origin (where you deployed the front end app) that's allowed to access your backend server.</p>

```
nano venus/main.config.ts
```
```js
const main_config : config = {
	mongodb : process.env.MONGO_CONNECTION!,
	email   : process.env.EMAIL!,
	pass    : process.env.PASS!,
	port    : process.env.PORT!,
	port_dev: process.env.PORT_DEV!,
	mode    : process.env.MODE!,
	github_public_key   : process.env.GITHUB_PUBLIC_KEY!,
	github_private_key  : process.env.GITHUB_PRIVATE_KEY!,
	github_callback_url : process.env.GITHUB_CALLBACK_URL!,
	redis_host          : process.env.REDIS_LABS_HOST!,
	redis_port          : process.env.REDIS_LABS_PORT!,
	redis_password      : process.env.REDIS_LABS_PASSWORD!,
	jwt_secret          : process.env.JWT_TOKEN!,
	// front_end_origin    : "http://localhost:8080",  // <-- if you running the app in the local env
	// front_end_origin    : "https://yourfrontendappdomain.com"  // <-- if you deployed the front-end app in different host
	// front_end_origin    : "/", // <-- if your front-end and the back-end are in the same host
	// front_end_origin    : "*", // <--if you allowed all origins accecing your back-end server
}

```
## Note: if you want to deploy the front-end and the back-end in the same host then
<p><strong>build the front-end assets</strong>, and uncomment that code in ``main.ts``</p>

```
// app.use('/',express.static(  __dirname + "/../mercury/dist"));
```
### compile the code 

```
npm run compile
```

### run app locally

```
npm run dev
```

### run app when it is in prod

```
npm run start
```

## Front-end setup

```
cd mercury
```

```
npm install
```

### Edit ``api.config.js``

```
nano api.config.js
```
```js
const api_config = {
	api_domain   : "https://yourbackendappdomain.com/"  // API Origin <SERVER SIDE ENDPOINT> 
	// api_domain   : "http://localhost:8000/" <-- if your app in local env
	// api_domain   : "/" <-- if your frontend app and the back-end server are in the same host
}
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## Note: You can use this library to run those servers <a href="https://www.npmjs.com/package/concurrently">concurrently</a>
<p>Instead of opening up multiple terminal tabs to run compiling and the server and the front-end proccesses</p>

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
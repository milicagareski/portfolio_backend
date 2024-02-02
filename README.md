To check which node version: node --version
To check which npm version: npm --version
To initiliaze new node.js project: npm init -y
To install Express: npm install express
All the packages installed by us are added in the package.json file under the dependencies or devDependencies sections
To run the server: node app.js
To install nodemon: npm install --save-dev nodemon (automatically restart the server and make code changes available without stopping/starting manually)
To run the server with nodemon:

1. add script under scripts in package.json (example: "dev": "nodemon app.js")
2. execute npm run dev

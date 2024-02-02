const fs = require("fs");
const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
  })
);

app.use(
  session({
    secret: "somesecret",
    name: "appLogin",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/contact", (req, res) => {
  const firstname = req.body.name || "";
  const email = req.body.email || "";
  const message = req.body.message || "";

  const content = fs.readFileSync(
    path.resolve(__dirname, "database/message.json")
  );
  const obj = JSON.parse(content.toString());
  obj.push({
    firstname,
    email,
    message,
  });

  fs.writeFileSync(
    path.resolve(__dirname, "database/message.json"),
    JSON.stringify(obj)
  );

  console.log(req.session);
  const result = "Thank you for contacting me";
  res.send(result);
});

app.get("/contact", (req, res) => {
  let obj = null;
  let status = 403;
  if (req.session && req.session.loggedIn) {
    const content = fs.readFileSync(
      path.resolve(__dirname, "database/message.json")
    );
    status = 200;
    obj = content.toString();
  }
  res.status(status).send(obj);
});

app.post("/login", (req, res) => {
  const username = req.body.username || "";
  const password = req.body.password || "";

  if (
    username &&
    password &&
    username === "milica" &&
    bcrypt.compareSync(
      password,
      "$2a$12$wz9IjufhPzF.dWwzMyNCIeJJ17N8Kc0Mw7m9UMBMyhn4d83/d9CY2"
    )
  ) {
    req.session.loggedIn = true;
  }

  res.send(req.session.loggedIn || false);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  console.log(req.session);
  res.send(true);
});

app.use((req, res, next) => {
  res.status(500);
  res.send("An Error Ocurred");
});

app.listen(port, (err) => {
  if (err) {
    console.error("Failed to run the server", err);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

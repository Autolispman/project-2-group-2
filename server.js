require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
// const sequelize = require("sequelize");
// const passport = require("passport");
// const jwt = require("jsonwebtoken");

//chuck some app related modules here
// const hookJWTStrategy = require("./services/passportStrategy.js");

const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//http request logger
app.use(morgan("dev"));

//hooking up passport
// app.use(passport.initialize());
// hookJWTStrategy(passport);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
console.log(passport.authenticate);
// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
// app.use("/api", require("./routes/apiAuthRoutes.js")(passport));

const syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user");

var url = process.env.DATABASEURL || "mongodb://localhost/workreducepay/";
mongoose.connect(url, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIG
app.use(
  require("express-session")({
    cookie: { maxAge: 180000 },
    secret: "WorkReduce is Awesome!",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var screenshotSchema = new mongoose.Schema({
  client: String,
  name: String,
  amount: Number,
  time: Number,
  pay: Number,
  created: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

var Screenshot = mongoose.model("Screenshot", screenshotSchema);

app.get("/", isLoggedIn, function (req, res) {
  Screenshot.find({}, function (err, allScreenshots) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { screenshots: allScreenshots });
    }
  });
});

//show dashboard
app.get("/dashboard", isLoggedIn, function (req, res) {
  Screenshot.find({}, function (err, allScreenshots) {
    if (err) {
      console.log(err);
    } else {
      res.render("dashboard", { screenshots: allScreenshots });
    }
  });
});

app.post("/", isLoggedIn, function (req, res) {
  var name = req.body.screenshot;
  var amount = req.body.amount;
  var client = req.body.client;
  var time = req.body.time;
  var pay = req.body.pay;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newScreenshot = {
    client: client,
    name: name,
    amount: amount,
    time: time,
    pay: pay,
    author: author,
  };
  Screenshot.create(newScreenshot, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.delete("/:id", isLoggedIn, function (req, res) {
  Screenshot.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// AUTH ROUTES

//show register form
app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  var wage = req.body.wage;
  var newUser = new User({ username: req.body.username, wage: wage });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/");
    });
  });
});

//show login form
app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//Logout route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP);

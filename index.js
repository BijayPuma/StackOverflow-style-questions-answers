const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

//Load Routes
const Questions = require("./controllers/questions");

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride("_method"));

mongoose.Promise = global.Promise;

// //connect to Mongoose
if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.mlab);
} else {
  mongoose.connect("mongodb://localhost/questionsAnswers");
}

// Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

app.use("/", Questions);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

// heroku config:set MLAB_URL=mongodb://questionsanswers:bijayrai1@ds161856.mlab.com:61856/questions-answers1

//heroku create questions-answers1

// mongo ds161856.mlab.com:61856/questionsanswers -u questionsanswers -p bijayrai1

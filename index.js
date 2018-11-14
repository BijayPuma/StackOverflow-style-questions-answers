const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

mongoose.Promise = global.Promise;

//connect to Mongoose
mongoose
  .connect(
    "mongodb://localhost/questionanswer",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

//Load Idea Model
require("./models/questionModel");
const Idea = mongoose.model("questions");

//Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  const title = "Bijay";

  res.render("about", {
    title: title
  });
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

// const express = require("express");
// const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
// // hbs.registerPartials(__dirname + "/views/partials");

// const QA = require("./controllers/questionsController");

// // const app = express();
// // app.use(methodOverride("_method"));

// // app.use(bodyParser.urlencoded({ extended: true }));

// // app.set("view engine", "hbs");

// // app.use("/", QA);

// app.set("view engine", "hbs");

// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.get("/about", (req, res) => {
//   const title = "Bijay";

//   res.render("about", {
//     title: title
//   });
// });

// app.listen(3000, () => {
//   console.log("App is running");
// });

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// //connect to Mongoose
if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.mlab);
} else {
  mongoose.connect("mongodb://localhost/questionsAnswers");
}

module.exports = mongoose;

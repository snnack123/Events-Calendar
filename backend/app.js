var express = require('express');
var morgan = require("morgan");
const cors = require("cors");
var db = require('./models/index');

db.sequelize.sync();
var app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/events", require("./routes/events.js"));
app.use("/users", require("./routes/users.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


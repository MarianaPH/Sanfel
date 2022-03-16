const express = require('express');
const connectDB = require('./config/db');
var bodyParser = require('body-parser')
const app = express();

//Connect Database
connectDB();

app.set("views", "./views");
app.engine("ejs", require("ejs").renderFile);
app.use("/dist", express.static("dist"));
app.use("/public", express.static("public"));

//init Middleare
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => res.send('API running'));

app.use("/login", require('./routes/login'));
app.use("/", require('./routes/auth'));
app.use("/forms", require('./routes/forms'));
app.use("/admin", require('./routes/admin'));
app.use("/registrant", require('./routes/registrant'));
app.use("/api/workshops", require('./routes/workshop'));
app.use("/api/questions", require('./routes/question'));
app.use("/api/areas", require('./routes/area'));
app.use("/api/subareas", require('./routes/subarea'));

const PORT = process.env.PORT || 5002;
console.log(__dirname);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

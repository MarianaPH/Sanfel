const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//init Middleare
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

app.use("/api/auth", require('./routes/auth'));
app.use("/api/admin", require('./routes/admin'));
app.use("/api/students", require('./routes/student'));
app.use("/api/workshops", require('./routes/workshop'));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
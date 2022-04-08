const express = require('express');
const cors = require("cors");
const app = express();
const employee = require('./src/routes/employee');



app.use(express.json());

app.use(cors({ credentials: true }));
app.use('/api', employee);



const PORT = process.env.PORT || 3305;

app.listen(PORT, () =>
console.log(`Server started on ${PORT}`)
);
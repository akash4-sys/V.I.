const express = require('express');
const cors = require('cors');
require('./config/db');

const PORT = 80;
const app = express();

app.use(cors());
app.use(express.json());

//Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
});
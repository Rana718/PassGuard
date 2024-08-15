const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');
const { authenticateToken } = require('./middleware/middleware');

const app = express();

app.use(cors());
app.use(express.json());


db.connect();


app.use('/auth', authRoutes);
app.use('/manager', authenticateToken, managerRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

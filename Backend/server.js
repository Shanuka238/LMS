const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const auth = require('./routes/auth');
const courses = require('./routes/courses');
const authenticateToken = require('./middleware/auth')

app.use(cors());
app.use(express.json());

//Basic Route
app.get('/', (req, res) => {
    res.send('Backend is running');
})

//Protected Route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({message: 'This is a protected route', user: req.user})
})

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://shanukaabey37_db_user:w3t49ND2XiQ2pXgG@lmscluster.1amqomm.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, 
    tlsAllowInvalidCertificates: true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

//Routes
app.use('/api/auth', auth)
app.use('/api/courses', courses)

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
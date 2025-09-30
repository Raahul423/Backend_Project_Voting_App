const express = require('express');
const ConnectDB = require('./Db');
require('dotenv').config();
const app = express();
const UserRoute = require('./Routes/UserRoute')
const CandidateRoute = require('./Routes/CandidateRoute')



app.use('/user',UserRoute)
app.use('/candidate',CandidateRoute)
ConnectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`port listening on http://localhost:${PORT}`);
})
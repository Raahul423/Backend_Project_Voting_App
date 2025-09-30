const mongoose = require('mongoose');
require('dotenv').config();

const Mongourl = process.env.MONGODB_URL;
const ConnectDB = async ()=>{
    try {
        const connect = await mongoose.connect(Mongourl);
        console.log(`Conncetion Succesfully ${connect.connection.host};`);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = ConnectDB;
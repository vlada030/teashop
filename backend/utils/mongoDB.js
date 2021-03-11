const mongoose = require('mongoose');

const dbConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        // ovo se ubacuje da nam nebi u konzoli izbacivalo upozorenja
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`Connected to MongoDB successfuly at host: ${conn.connection.host}`.brightBlue);

}

module.exports = dbConnection;
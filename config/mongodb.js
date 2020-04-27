const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on("connected", () => console.log(" Mongodb connected :)"));

mongoose.connection.on("error", () => console.log("Db error:("));

const express = require("express");
const app = express();
const todoRoutes = require("./routes/todo.routes");
const mongo = require("./mongodb/mongodb.connect");
console.log('coonect :', mongo.connect());

app.use(express.json());
app.use("/todos",todoRoutes);
app.get("/", (req, res)=>{
    res.json("Hello");
});


// app.listen(3000);

module.exports = app;
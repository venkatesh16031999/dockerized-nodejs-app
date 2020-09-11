const express = require("express");
const app = express();

// databsae
const db = require("./db/db");
db.run();

// logging server activities
const morgan = require("morgan");

// cross origin request access
const cors = require("cors");

// additional security headers
const helmet = require("helmet");

const bodyParser = require("body-parser");

const postRouter = require("./routes/post");

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/posts",postRouter);

app.get("/",(req,res)=>{
    res.send("server is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
});
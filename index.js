const express = require("express");
const app = express();

// enviroimnet config
const dotenv = require("dotenv");

dotenv.config({path:"./config/config.env"});

// databsae
const db = require("./db/db");
db.run();

// express session middleware

const session = require("express-session");

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }))

// logging server activities
const morgan = require("morgan");

// cross origin request access
const cors = require("cors");

// additional security headers
const helmet = require("helmet");

const bodyParser = require("body-parser");

// passport js initialization ( authentication middleware )
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

require("./middlewares/auth")(passport);



app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routes
const postRouter = require("./routes/post");
const authRouter = require("./routes/auth");

app.use("/posts",postRouter);
app.use("/auth",authRouter);

app.get("/",(req,res)=>{
    res.send("server is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
});
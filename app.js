import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // For parsing JSON bodies
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import requestRouter from "./routes/request.routes.js";
import connectionRouter from "./routes/connections.routes.js";

const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.static("./assets"));

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(bodyParser.json());
app.use(cookieParser());

 app.use('/',userRouter);
 app.use('/',profileRouter);
 app.use('/',requestRouter);
 app.use('/',connectionRouter)


export {app}
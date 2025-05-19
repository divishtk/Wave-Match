import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // For parsing JSON bodies
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";


const app = express();
app.use(cors());
app.use(express.static("./assets"));

app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(
    express.json()
  );
  app.use(cookieParser());
  app.use(bodyParser.json());

 app.use('/api/v1/auth',userRouter)

export {app}
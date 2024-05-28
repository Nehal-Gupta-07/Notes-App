import express, { request, response } from "express";
import { PORT , mongoDBURL} from "./config.js"; 
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing JSON
app.use(express.json());

app.use(cors());


//Home page route
app.get('/' , (request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome");
});

app.use('/books',booksRoute);

//Database connection
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected");
        app.listen(PORT , ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });
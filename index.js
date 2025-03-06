import express from "express";
import usuariosRouter from './routes/user.routes.js'
import articulosRouter from './routes/articles.routes.js'
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config(); // variables de entorno

const app = express();
const port = process.env.PORT

app.use(express.json());


app.get("/", function (req, res) {
  res.send("hello server..")  
});

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use('/usuarios', usuariosRouter);
app.use('/articulos', articulosRouter);

app.listen(port, function(){
  console.log("server on port:", port)
});


import express from 'express'
import cors from 'cors'
import connectDB from "../src/config/db.js"; 
import todoRoutes from "../src/routes/todo_routes.js"
import errorMiddleware from '../src/middlewares/todo_middleware.js'; 
import dotenv from "dotenv";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors())
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/todos", todoRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorMiddleware);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


import express from "express";
import path from 'path';
import bodyParser from "body-parser";
import cors from "cors";
import Router from "./routes/index.js";

const app = express();

app.use(express.static(path.resolve(process.cwd(), '../frontend/dist')));
app.use(cors());
app.use(bodyParser.json())
app.use(Router);

app.listen(5000, () => console.log('Server running at http://localhost:5000'));
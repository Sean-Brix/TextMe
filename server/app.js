import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_URI = process.env.MONGO_URI;
const SKEY = process.env.SESSION_KEY || '----';

// Request Handler
const app = express();

app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET'],
    credentials: true,
}))

// Request Routes
import index_rt from './Routes/index_rt.js';
app.use('/', index_rt);

// Invalid Route
app.use((req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

export default app;

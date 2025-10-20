import express from 'express';
import cors from 'cors';
import savetubeRouter from './routes/savetube.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API router
app.use('/api/savetube', savetubeRouter);

// Simple health
app.get('/', (req, res) => res.json({ status: 'ok', message: 'API server is running' }));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

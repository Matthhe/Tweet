import AnalysisManager from "../BusinessLayer/services/AnalysisManager.js";
import FileRepository from "../DataLayer/FileRepository.js";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // Для правильной работы путей
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/states', async (req, res) => {
    try {
        const repo = new FileRepository();
        const readState = await repo.readStates();
        res.json(readState);
    } catch (err) {
        res.status(500).send("Error loading states");
    }
});

app.get('/api/trends/:filename', async (req, res) => {
    try {
        const analyze = await AnalysisManager.analyze(req.params.filename);
        res.json(analyze);
    } catch (err) {
        res.status(500).send("Error analyzing file: " + err.message);
    }
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


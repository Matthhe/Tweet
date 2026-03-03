import AnalysisManager from './AnalysisManager.js';
import FileRepository from "../DataLayer/FileRepository.js";
import express from 'express';
import path from 'path';
const app = express();
const PORT = 3000

app.use(express.static(path.join(process.cwd(), 'PresentationLayer', 'public')));

app.get('/api/states', async (req, res) => {
    const repo = new FileRepository();
    const readState = await repo.readStates();
    res.json(readState);
})

app.get('/api/trends/:filename', async (req, res) => {
    const analyze = await AnalysisManager.analyze(req.params.filename);
    res.json(analyze);
})

app.listen(PORT, () => console.log('Server is running on port ' + PORT));


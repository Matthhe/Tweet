// Здесь будет подгрузка и парсинг данных из файлов
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import readline from 'readline';
import csv from 'csv-parser';
import StateParser from './parsers/StateParser.js';
import TweetParser from './parsers/TweetParser.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileRepository {
    constructor() {
        this.datePath = path.join(__dirname, 'data');
    }

    async readStates (){
        try {
            const filePath = path.join(this.datePath, 'states.json');
            const data = await fsPromises.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            return StateParser.parsingStates(jsonData);
        } catch (err) {
            console.error("Error reading states.json", err);
            throw err;
        }
    }

    async readSentiments (){
        const filePath = path.join(this.datePath, 'sentiments.csv');
        const results = {};

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv(['word', 'score']))
                .on('data', (data) => {
                    results[data.word] = parseFloat(data.score);
                })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }

    async readTweets(filename){
        const filePath = path.join(this.datePath, filename);
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const allTweets = [];
        for await (const line of rl) {
            if (line.trim()) { // Пропускаем пустые строки
                allTweets.push(TweetParser.parseLine(line));
            }
        }
        return allTweets;
    }
}

export default FileRepository;
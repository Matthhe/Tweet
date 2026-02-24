// Здесь будет подгрузка и парсинг данных из файлов
// парсинг через регулярные выражение
// подгрузка и хранение => асинхронно
// здесь будет проходить работа с файлами
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import StateParser from './parsers/StateParser.js';

class FileRepository {
    constructor() {
        this.datePath = path.join(process.cwd(), 'idea', 'DataLayer', 'data');
    }

    async readStates (){
        try {
            const filePath = path.join(this.datePath, 'states.json');

            const data = await fs.readFile(filePath, 'utf8');

            const jsonData = JSON.parse(data);
            return StateParser.parsingStates(jsonData)
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
                .pipe(csv(['word', 'score'])) // заголовки, если их нет в файле
                .on('data', (data) => {
                    results[data.word] = parseFloat(data.score);
                })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }
}


export default FileRepository;
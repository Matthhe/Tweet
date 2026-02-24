// Здесь будет подгрузка и парсинг данных из файлов
// парсинг через регулярные выражение
// подгрузка и хранение => асинхронно
// здесь будет проходить работа с файлами
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import readline from 'readline';
import csv from 'csv-parser';
import StateParser from './parsers/StateParser.js';
import TweetParser from './parsers/TweetParser.js';

class FileRepository {
    constructor() {
        this.datePath = path.join(process.cwd(), 'idea', 'DataLayer', 'data');
    }

    async readStates (){
        try {
            const filePath = path.join(this.datePath, 'states.json');

            const data = await fsPromises.readFile(filePath, 'utf8');

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

    async readTweets(filename){
        const filePath = path.join(this.datePath, filename);
        const fileStream = fs.createReadStream(filePath); // если файл весит больше, чем есть свободная память = ошибка

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity // корректная обработка \r \n(один символ и один перенос строки, а так это вообще два символа)
        });

        const allTweets = []

        for await (const line of rl) { // for await не читает файл в одну милисек, а построчно и асинхронно
            allTweets.push(TweetParser.parseLine(line)) ;
        }

        return allTweets;

    }
}


export default FileRepository;
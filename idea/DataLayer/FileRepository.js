// Здесь будет подгрузка и парсинг данных из файлов
// парсинг через регулярные выражение
// подгрузка и хранение => асинхронно
// здесь будет проходить работа с файлами
import fs from 'fs/promises';
import path from 'path';
import StateParser from './parsers/StateParser.js';

class FileRepository {
    constructor() {
        this.datePath = path.join(process.cwd(), 'idea', 'DataLayer', 'data');
    }

    const
    readStates = async () => {
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
}
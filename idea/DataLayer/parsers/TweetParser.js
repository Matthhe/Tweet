// фильтрация по термину, поиск ближайшего штата, группировка, усреднение.
import Tweet from "../../BusinessLayer/models/Tweet.js";
import fs from "fs";
import path from "path";
class TweetParser{
    constructor(){
        this.datePath = path.join(process.cwd(), 'idea', 'DataLayer', 'date');
    }

    async readTweets(){

        const filePath = fs.join(this.datePath, 'weekend_tweets2014.txt');

        const content = await fs.readFile(filePath, 'utf8');



    }
}
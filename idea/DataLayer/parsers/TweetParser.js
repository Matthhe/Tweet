// фильтрация по термину, поиск ближайшего штата, группировка, усреднение.
import Tweet from "../../BusinessLayer/models/Tweet.js";
class TweetParser {
    static parseLine(line){
        const newLine = line.split("\t");
        const regexNumbers = /-?\d+\.?\d*/g;

        const resultNumbers = newLine[0].match(regexNumbers);
        let lat = Number(resultNumbers[0]);
        let long = Number(resultNumbers[1]);

        let data = newLine[2];
        let text = newLine[3];
        return new Tweet(long, lat, data, text);
    }

    static getWords(text){
        const newText = text.toLowerCase();
        const regexWords = /[a-z]+/g;

        const resultWords = newText.match(regexWords);
        if (resultWords === null) {
            return [];
        }
        return resultWords;
    }
}

export default TweetParser;
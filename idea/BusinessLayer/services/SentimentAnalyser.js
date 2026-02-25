import TweetParser  from "../../DataLayer/parsers/TweetParser.js";

class SentimentAnalyser{
    static sentimentAnalyser(tweet, results){
        const words = TweetParser.getWords(tweet.text);

        let totalScore = 0;
        let foundWords = 0;

        for( let word of words ){
            if(results[word] !== undefined){
                totalScore+= results[word];
                foundWords++;
            }
        }
        if(foundWords > 0){
            return totalScore / foundWords;
        }
        else{
            return null;
        }
    }
}
export default SentimentAnalyser;
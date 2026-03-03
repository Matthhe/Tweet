import TweetParser  from "../../DataLayer/parsers/TweetParser.js";

class SentimentAnalyser{
    static sentimentAnalyser(tweet, results){
        const words = TweetParser.getWords(tweet.text);
        let totalScore = 0
        let foundWords = 0
        for(let i = 0; i < words.length; i++){
            let mathcFound = false;
            for(let len = 5; len >= 1; len--){
                const phraseWords = words.slice(i, i + len);
                const phrase = phraseWords.join(' ');
                if(results[phrase] !== undefined){
                    totalScore += results[phrase];
                    foundWords++;
                    i += len - 1
                    break;
                }

            }
        }
        if (foundWords > 0){
            return totalScore / foundWords;
        }
        return null;
    }
}
export default SentimentAnalyser;
import FileRepository from "../../DataLayer/FileRepository.js";
import GeoService from "./GeoService.js";
import SentimentAnalyser from "./SentimentService.js";

class AnalysisManager {
    static async analyze(filename){

        const repo = new FileRepository();

        const states =  await repo.readStates();
        const sentiment = await repo.readSentiments();
        const tweet = await repo.readTweets(filename);

        const resultByState = {}
        for(let t of tweet){
            let score = SentimentAnalyser.sentimentAnalyser(t, sentiment);
            if(score == null){
                continue;
            }
            let finalState = GeoService.findCLosestState(t.lat, t.long, states);
            if(!(finalState in resultByState)){
                resultByState[finalState] = [];
            }
            resultByState[finalState].push(score);

        }
        const finalTrends = {}
    }
}

import State from './State';

class StateParser {
    static parsingStates(jsonData){
        const statesArray = [];
        for(const code in jsonData){
            const rawData = jsonData[code] // Added varaible
            let totalLat = 0;
            let totalLong = 0;
            let totalResult = 0
            let pointsCount = 0;

            const flatPoints = rawData.flat(Infinity)
            for(let i = 0; i < flatPoints.length; i += 2){
                totalLong += flatPoints[i];
                totalLat += flatPoints[i+1];
                //totalResult = totalLat + totalLong;
            }

            pointsCount = flatPoints.length / 2;

            const center ={
                lat: totalLat / pointsCount,
                long: totalLong / pointsCount
            }
            const newState = new State(code, rawData, center); // Added cause in general we will have empty object
            statesArray.push(newState);

        }
        return statesArray;
    }
}
// all functionality of this class added
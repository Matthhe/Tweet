import State from './State';

class StateParser {
    static parsingStates(jsonData){
        const statesArray = [];
        for(const code in jsonData){
            let totalLat = 0;
            let totalLong = 0;
            let pointsCount = 0;

            polygons.forEach(poligon => {
                poligon.forEach(sub => {
                    if(typeof(sub[0]) ==='number'){
                        totalLong += sub[0];
                        totalLat += sub[1];
                        pointsCount++;
                    }
                    else{
                        sub.forEach(point => {
                            totalLong += point[0];
                            totalLat += point[1];
                            pointsCount++;
                        })
                    }
                })
            });
            const center ={
                lat: totalLat / pointsCount,
                long: totalLong / pointsCount
            }
            const newState = new State(center);
            statesArray.push(newState);

        }
        return statesArray;
    }
}
// all functionality of this class added
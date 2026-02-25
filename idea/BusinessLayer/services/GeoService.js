class GeoService {
    static findCLosestState(lat, long, statesArray) {
            let minDist = Infinity;
            let bestState;

            for(let state of statesArray) {
                let distance = Math.sqrt(Math.pow(lat - state.center.lat, 2)
                    + Math.pow(long - state.center.long, 2));
                if (distance < minDist) {
                    minDist = distance;
                    bestState = state;

                }
            }
            return bestState.code;
    }
}

export default GeoService;
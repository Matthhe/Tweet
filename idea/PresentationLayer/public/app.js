const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const selectButton = document.getElementById('fileSelect');
const analyzeButton = document.getElementById('analyzeBtn');

const minLon = -125
const maxLon = -65
const minLat = 25
const maxLat = 50

function project(lon, lat){
    const x = (lon - minLon) * (width / (maxLon - minLon));
    const y = height - (lat - minLat) * (height / (maxLat - minLat));
    return { x, y };
}
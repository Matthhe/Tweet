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

function getColor(sentiment){
    if(sentiment === null){
        return 'rgb(128, 128, 128)'
    }
    if(sentiment === 0) return 'rgb(255, 255, 255)'

    let r, g, b;
    if(sentiment > 0){
        r = 255;
        g = Math.round(sentiment * 255);
        b = 0;
    } else {
        r = 0;
        g = Math.round(Math.abs(sentiment) * 255);
        b = 255;
    }
    return `rgb(${r}, ${g}, ${b})`;
}
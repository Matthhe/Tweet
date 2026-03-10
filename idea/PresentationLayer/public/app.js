const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const selectButton = document.getElementById('fileSelect');
const analyzeButton = document.getElementById('analyzeBtn');

const width = canvas.width;
const height = canvas.height;

const minLon = -125;
const maxLon = -65;
const minLat = 25;
const maxLat = 50;

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

let statesData = []

function draw(trends = {}){
    ctx.clearRect(0, 0, width, height) // clear place where we draw

    statesData.forEach((state) => {
        const sentiment = trends[state.code] !== undefined ? trends[state.code] : null;
        ctx.fillStyle = getColor(sentiment);
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 0.5;

        state.polygon.forEach(polygon => {
            ctx.beginPath();

            const points = Array.isArray(polygon[0][0]) ? polygon[0] : polygon;

            points.forEach((point, index) => {
                const { x, y } = project(point[0], point[1]);
                if (index === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });

            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
    });
}

async function init() {
    console.log("Loading states...");
    const response = await fetch('/api/states');
    statesData = await response.json();
    console.log("States loaded:", statesData.length);
    draw();
}

analyzeButton.addEventListener('click', async () => {
    const filename = selectButton.value;
    analyzeButton.disabled = true;
    analyzeButton.innerText = "Analyzing...";

    console.log(`Analyzing ${filename}...`);
    try {
        const response = await fetch(`/api/trends/${filename}`);
        const trends = await response.json();
        console.log("Analysis results:", trends);
        draw(trends);
    } catch (e) {
        console.error("Analysis failed", e);
    } finally {
        analyzeButton.disabled = false;
        analyzeButton.innerText = "Analyze";
    }
});

init();
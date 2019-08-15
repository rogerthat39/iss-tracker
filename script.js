//global variables
let mapImg
let issX = 0
let issY = 0
let latitude = 0
let longitude = 0

function gotData(data) {
    longitude = data.iss_position.longitude
    latitude = data.iss_position.latitude

    //map the on-screen latitude and longitude to fit on the canvas
    issX = map(longitude, -180, 180, 0, 500)
    issY = map(latitude, 90, -90, 0, 555)
}

function askISS() {
    //get json file, and when recieved that data, call gotData function
    loadJSON("http://api.open-notify.org/iss-now.json", gotData)
}

//p5.js functions
function preload() {
    mapImg = loadImage("https://www.axismaps.com/guide/general/map-projections/projections1.jpg")
}

function setup() {
    setInterval(askISS, 5000) //call function every 5 seconds
    createCanvas(500, 555)
    fill('#ff0000')
    stroke('#ff0000')
}

function draw() {
    image(mapImg, 0, 0)
    ellipse(issX, issY, 10, 10)

    //display the labels next to the ISS dot
    textSize(15)
    text('ISS', issX + 10, issY)
    textSize(12)
    text('latitude: ' + latitude, issX+10, issY+20)
    text('longitude: ' + longitude, issX+10, issY+35)
}

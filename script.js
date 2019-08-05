//global variables
let mapImg
let issX = 0
let issY = 0
let latitude = 0
let longitude = 0

function gotData(data) {
    longitude = data.iss_position.longitude
    latitude = data.iss_position.latitude
    issY = map(latitude, -90, 90, 0, 600)
    issX = map(longitude, -360, 360, 0, 1350)
    console.log(issX + ' ' + latitude)
    console.log(issY + ' ' + longitude)
}

function askISS() {
    //get json file, and when recieved that data, call gotData function
    loadJSON("http://api.open-notify.org/iss-now.json", gotData)
}

//p5.js functions
function preload() {
    mapImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/0/09/BlankMap-World-v2.png")
}

function setup() {
    setInterval(askISS, 5000) //call function every 5 seconds
    createCanvas(1350, 600)
    fill(0)
}

function draw() {
    image(mapImg, 0, 0)
    ellipse(issX, issY, 10, 10)

    textSize(15)
    text('ISS', issX + 10, issY)
    textSize(12)
    text('latitude: ' + latitude, issX+10, issY+20)
    text('longitude: ' + longitude, issX+10, issY+35)
}


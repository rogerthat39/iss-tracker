//get json file from NASA API, return data and call gotData
function queryAPI() {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(r => {
        return r.json()
    })
    .then(data => {
        gotData(data)
        updatePosition()
    })
}

//what to do after the data has returned
function gotData(data) {
    longitude = data.longitude
    latitude = data.latitude

    //map the on-screen latitude and longitude to fit on the canvas
    issY = scale(longitude, -180, 180, 0, 400)
    issX = scale(latitude, 90, -90, 0, 800)
}

function updatePosition() {
    //draw image (so only one dot appears on screen at once)
    context.drawImage(map, 0, 0)

    //draw dot
    context.beginPath()
    context.arc(issX, issY, 5, 0, 2 * Math.PI)
    context.fillStyle = "red"
    context.fill()
    context.closePath()

    //draw labels
    context.font = "15px Arial"
    context.fillText('ISS', issX + 10, issY)
    context.font = "12px Arial"
    context.fillText('latitude: ' + latitude, issX+10, issY+20)
    context.fillText('longitude: ' + longitude, issX+10, issY+35)
}

//scale down real-life coordinates to fit on image
//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers#23202637
function scale (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//global variables
let issX = 0
let issY = 0
let latitude = 0
let longitude = 0
let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")
let map = document.getElementById("img")

//query the API every 5 seconds
setInterval(queryAPI, 5000)

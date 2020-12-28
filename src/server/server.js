// Setup empty JS object to act as endpoint for all routes
projectData = {};
textInfo = {}; // to save text that comes from users
weatherData = {}; //to send data that weather api need
weather = {};
pictures = {};

//AllData = { textInfo, weatherData };
var path = require('path')
const express = require('express')
    //const mockAPIResponse = require('./mockAPI.js')

// dovent 
const dotenv = require('dotenv');
dotenv.config();

//node-fetch
const fetch = require('node-fetch');



// Start up an instance of app
const app = express()

const cors = require('cors');
const bodyParser = require('body-parser');
const { words } = require('lodash');
const { response } = require('express');
const { info } = require('console');

app.use(express.static('dist'))

// now we have to create our midlewaree
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

console.log(__dirname)

app.get('/', function(req, res) {

    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(3223, function() {
    console.log('Example app listening on port 3223!')


})

const countariesAll = async() => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    // return await response.json();
    const data = await response.json();
    const { allcountries } = await data;
    console.log(allcountries);
    console.log(data);
    return await response.json();



};

//app.get('/test', function(req, res) {
//    res.send(mockAPIResponse)
//})


app.get('/g', (req, res) => {


        //res.json({ message: 'success', feeling: 'good' }); //to check

        //res.send(AllData);
        res.send(weather);
        //res.send(projectData);


        //console.log(weather); //to check
    })
    // i moved into function
app.get('/gCount', (req, res) => {


    //res.json({ message: 'success', feeling: 'good' }); //to check

    res.send(allcountries);
    //console.log(projectData); //to check
})


//console.log(projectData);
app.post('/s', (req, res) => {

    const cityOrg = req.body.cityOrg;
    const cityDes = req.body.cityDes;

    const Dep = req.body.Dep;
    const Arr = req.body.Arr;
    textInfo = { cityA: cityOrg, cityD: cityDes, Ddate: Dep, Adate: Arr }
        //console.log(tt);
        //texts = req.body;
        //console.log(req.body);
    console.log(`Your Depature Date is ${Dep} And Your Arrive Date is ${Arr} `);
    console.log(`Your Trip is From ${cityOrg} to ${cityDes} `);
    //console.log(textInfo);
    //console.log(projectData);






    getGeoInfo();
    // getPicture();
    getWeather();
    bringImage(cityDes)













});

//const times1 = (date) => {
//    return new Date(date).getTime() / 1000;
//};

async function getGeoInfo(cityD) {
    const response = await fetch(`http://api.geonames.org/search?q=` + textInfo.cityD + `&username=${process.env.UsernameRc}&type=json`);
    const data = await response.json();
    const { geonames } = await data;
    console.log(`your Destination City is ` + textInfo.cityD);
    console.log(`Your Username for Geananes is ${process.env.UsernameRc}`);
    console.log(geonames[0]);
    //console.log(geonames[0].lng);
    //console.log(geonames[0].lat);
    const lat = geonames[0].lat
    const lng = geonames[0].lng
    console.log(`the ${textInfo.cityD} lat is  ` + lat);
    console.log(`the ${textInfo.cityD} lng is  ` + lng);
    var d = new Date(); // for now
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var currentTime = h + ':' + m + ':' + s;
    console.log(`the Current Time is ${currentTime}`);
    //console.log(times1);
    weatherData = { lat: lat, lng: lng, time: currentTime, Dcity: textInfo.cityD }
        // projectData = { cityO: textInfo.cityA, cityD: textInfo.cityD, Ddate: textInfo.Ddate, Adate: textInfo.Adate, lat: weatherData.lat, lng: weatherData.lng, hTemp: weather.hTemp, mTemp: weather.mTemp, Desc: weather.Desc }
    return await geonames[0];
}

/*async function getPicture(cityDes) {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.pixyApi}&q=` + textInfo.cityD + `&image_type=photo`);
    const data = await response.json();
    const { picture } = await data;
    console.log(`your Destination City is ` + textInfo.cityD);
    console.log(`Your Username for Geananes is ${process.env.pixyApi}`);

    //console.log(times1);
    //weaterData = { lat: lat, lng: lng, time: currentTime, Dcity: textInfo.cityD }
    return await picture;
}*/

//var l = weatherData.lat;
//var n = weatherData.lng;
//var t = weatherData.time;
async function getWeather(cityDes) {




    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=` + textInfo.cityD + `&key=${process.env.weatherApi}`);
    //const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=riyadh&key=efa83d1fbac54b99a4b93d61e64536ab`);
    const data1 = await response.json();
    const { data } = await data1;
    console.log(`your Destination City is ` + textInfo.cityD);
    console.log(`Your Username for Geananes is ${process.env.weatherApi}`);
    //console.log(l);
    //console.log(n);
    //console.log(t);
    //console.log(data);to check all 16 days of forcasting
    console.log(data[0]);
    var maxTemp = data[0].app_max_temp;
    //console.log(maxTemp);
    var minTemp = data[0].app_min_temp;
    //console.log(minTemp);
    var weathDesc = data[0].weather.description;
    //console.log(weathDesc);
    weather = { hTemp: maxTemp, mTemp: minTemp, Desc: weathDesc, image: pictures.image }
    console.log(weather);
    return await data[0];




    //console.log(times1);
    //weaterData = { lat: lat, lng: lng, time: currentTime, Dcity: textInfo.cityD }
    //return await data;
}

async function bringImage(cityDes) {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.pixyApi}&q=${textInfo.cityD}&image_type=photo`)


    const data = await response.json();
    const { hits } = await data;
    const { webformatURL } = await hits[0];
    //const imUrl = hits[0].webformatURL;
    console.log(webformatURL);
    pictures = { image: webformatURL };
    return await webformatURL;
};

/*async function bringImage(destiCity) {
    const response = await fetch(`https://pixabay.com/api/?key=${process.env.pixyApi}&q=${textInfo.cityD}&image_type=photo`)


    const data = await response.json();
    const { hits } = await data;
    const imUrl = hits[0].webformatURL;
    return await imUrl;
};*/

/*async function getGeoInfo(cityDes) {
    const response = await fetch(`http://api.geonames.org/search?q=${cityDes}&username=${process.env.Username}&type=json`);
    const data = await response.json();
    const geonames = await data;
    console.log(`your Destination City is ${cityDes}`);
    console.log(`Your Username for Geananes is ${process.env.apiKey}`);
    console.log(geonames);
    //const lat = geonames.lat
    //const lng = geonames.lng
    // console.log(lat);
    //console.log(lng);
    return await geonames;
}*/


// https://restcountries.eu/rest/v2/capital/riyadh
//const url1 =`https://restcountries.eu/rest/v2/capital/`${cityDes}
//const urlC = `https://api.meaningcloud.com/sentiment-2.1?key=` + process.env.apiKey + `&of=json&txt=` + tt + `&model=general%20&lang=en`;
//const urlC = `https://api.meaningcloud.com/sentiment-2.1?key=` + process.env.apiKey + `&of=json&txt=` + tt + `&model=general%20&lang=en`;
//console.log(url);


/*fetch(url)
        .then(response => response.json())
        .then(data => {

            const f = data.confidence
            console.log(f);

            const g = data.agreement
            console.log(g);

            projectData = { TEXT: tt, Confidence: f, Agree: g }
            console.log(projectData);
            res.send(projectData);


        })
        .catch(err => console.log("error from fetch node"))


});

/*getLangLat(cityDes){
    const response = await fetch(`http://api.geonames.org/search?q=`${target}`&username=${process.env.Username}&type=json`);
}*/
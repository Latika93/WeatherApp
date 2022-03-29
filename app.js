const express = require("express");
const { status } = require("express/lib/response");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req, res){
    const query = req.body.cityName;
    const apiKey = "860146127fc507ebafba2f3c331945fe";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units="+ unit

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);

            const description = weatherdata.weather[0].description;
            const temp = weatherdata.main.temp;
            const icon = weatherdata.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            console.log(description);

            
            res.write("<h1>Temperature in "  + query  + " is " + temp + " degree celsius..!!</h1>");
            res.write("<img src="+ imageURL + " />");
            res.write("Weather description is " + description);
            
            res.send();

        })
    });
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


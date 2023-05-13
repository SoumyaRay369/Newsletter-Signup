const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https= require('https');

app.use(bodyParser.urlencoded({ extended: true }));
const request = require('request');

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
    // res.send("The GET request is working");
})

app.post("/", function(req,res){
    const firstName= req.body.fName
    const lastName= req.body.lName
    const mail= req.body.Email

    // console.log(firstName, lastName, mail);

    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            
     } ]
    }

    const jsonData = JSON.stringify(data);
    const url= "https://us9.api.mailchimp.com/3.0/lists/4e9fbd0a1a";
    const options = {
        method: "POST",
        auth: "soumya:f79cb9990bed916fbbf609c72204aa69-us9"
    }


    const request= https.request(url, options, function(response){
    if(response.statusCode===200) 
    {
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
})

//API Key
// 9be543b9ea023748c0895e561e2c81f2 - us9

//Audience ID
// 4e9fbd0a1a

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})




app.post('/', function(req, res) {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = 'https://us4.api.mailchimp.com/3.0/lists/1c1e5ff937';
  const options = {
    method: "POST",
    auth: "abdallah:3731fc0e6b94af4f7bc0f2ccc59fbe6e-us4"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.post('/failure',function(req,res){
  res.redirect("/");
})







app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on Port 3000");
})


// 3731fc0e6b94af4f7bc0f2ccc59fbe6e-us4


// 1c1e5ff937

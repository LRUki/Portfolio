//jshint esversion:6

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const ipInfo = require("ipinfo");
const path = require('path');
const sendMail = require(path.join(__dirname, 'mail.js'));

var path_to_json = path.join(__dirname, 'visitors.json');
var fs = require("fs");

//connect to pubic js and css
app.use(express.static(path.join(__dirname, 'public')));

//ejs
app.set('view engine', 'ejs');
app.set("PORT", PORT);


app.get('/', function (req, res) {

	//retrieving clients TRUE ip address
	const forwarded = req.headers['x-forwarded-for'];
	const ipAddr = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress;
	ipInfo(ipAddr, function (err, cLoc) {
		if (err) {
			console.log(err);
			res.sendFile(path.join(__dirname, 'views', 'index.html'));
		} else {
			var userIpInfo = cLoc; //obj of visitors ip info 
			//reading previous file
			fs.readFile(path_to_json, 'utf8', function (err, data) {
				if (err) {
					console.log(err);
				} else {
					var obj = JSON.parse(data); //convert the loaded data to obj
					var lastObj = obj.data.slice(-1)[0];
					obj.data.push({
						"count": lastObj.count + 1
					});
					var json = JSON.stringify(obj, null, 3);
					console.log(JSON.stringify(userIpInfo))
					fs.writeFileSync(path_to_json, json, 'utf8');
					res.render('index', {
						visitorData: userIpInfo,
						visitorDataString: JSON.stringify(userIpInfo, null, 3)
					}) //by default it will search 'index'.ejs file inside views repo
					userIpInfo["count"] = lastObj.count + 1;

					//sending geolocation mail
					sendMail(userIpInfo);

				}
			});


		}

	});


});


app.listen(app.get('PORT'), function () {
	console.log('Express started on http://localhost:' +
		app.get('PORT') + '; press Ctrl-C to terminate.');
});
module.exports = (geoLoc) => {
    //import api key for mailgun
    const myApis = require('./api');

    var api_key = myApis.mailgunApi;
    var domain = 'sandbox035bb67f456a41f2a6df69ad1b56cbf3.mailgun.org';
    var mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });
    var userIpMail = {
        from: 'VisitorOfLeo@gmail.com',
        to: 'ryutaunoki22@fuji.waseda.jp',
        subject: 'WebVisitors',
        text: JSON.stringify(geoLoc, null, 3)
    };

    mailgun.messages().send(userIpMail, function (err, body) {
        if (err) {
            console.log(userIpInfo.count, JSON.stringify(userIpInfo, null, 3));
            console.log('mail failed' + err);
        } else {
            console.log('mail success!');
        }
    });
};
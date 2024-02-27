const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch-native');

const app = express();
const PORT = process.env.PORT || 5000;

//Middle Ware
app.use(bodyParser.urlencoded({extended: true}));

//static folder
app.use(express.static(path.join(__dirname, 'public')));


//Signup route
app.post('/signup', (req, res) => {
    const {email} = req.body;
    console.log(req.body);
    console.log(res.statusCode);

    if(!email){
        res.redirect('/fail.html');
        return;
    }
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
            }
        ]
    };
    const postData = JSON.stringify(data);
    console.log(postData);
    fetch('https://us10.api.mailchimp.com/3.0/lists/88f7f7c5e1', {
        method: 'POST',
        headers: {
            Authorization: 'auth da390760e3088698e407cc5411d3d17e-us10'
        },
        body: postData
    })
    .then(res.statusCode === 200? res.redirect('/success.html') : res.redirect('/fail.html'))
    .catch(err => console.log(err))
});

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});
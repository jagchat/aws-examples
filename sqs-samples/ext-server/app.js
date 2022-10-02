var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();
//-->following two line needed for POST/PUT etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
    res.json({ msg: "Use '/hook' POST anything" });
});

router.post('/hook', (req, res) => {
   console.log(req.body);
   res.send("From Hook: Done!");
});

app.use('/', router);
app.listen(9090, () => {
    console.log("Started listening at: 9090");
});
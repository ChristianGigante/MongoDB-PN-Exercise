// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3231

// Create express app
const app = express();
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/db_exercise_gigante';
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------


// Import modelRiders
const modelRider = require('./models/rider.model');
const modelMotor = require('./models/motorcycle.model')

// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet.
app.post('/rider', (req, res) => {
    console.log(req.body);
    let rider = new modelRider.Rider(req.body);
    rider.save(function (err, rider) {
        if (err) return console.error(err);
        res.send(rider);
    });
});


// Question 2 - Create a HTTP Request to fetch all the riders :
app.get('/rider', (req, res) => {
    modelRider.Rider.find((err, data) => {
        if (err) {
            res.send(err)
        }
        res.send(data);
    })
})

// Question 3 - Create a HTTP Request to fetch one rider :
app.get('/rider/:id', (req, res) => {
    modelRider.Rider.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    })
})

// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :
app.put('/rider/:id/score', (req, res) => {
    modelRider.Rider.findByIdAndUpdate({ _id: req.params.id },
        req.body, (err, data) => {
            if (err) {
                res.send("<404> Rider Not Found " + err);
            }
            res.send(data);
        })
        .catch(err => {
            res.send("<500> Service Unavailable!" + err)
        })
})

// Question 5 - Create a HTTP Request to ADD score of a rider :
app.put('/rider/:id', (req, res) => {
    modelRider.Rider.findOneAndUpdate({ _id: req.params.id },
        { $push: { score: req.body.score } },
        (err, data) => {
            if (err) {
                res.send("<404> Rider Not Found " + err);
            }
            res.send(data);
        })
        .catch(err => {
            res.send("<500> Service Unavailable!" + err)
        })
})


// Question 6 - Create a HTTP Request to delete one rider :
app.delete('/rider/:id', (req, res) => {
    modelRider.Rider.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send("<404> Rider Not Found " + err);
        }
        res.send(data)
    })
        .catch(err => {
            res.send("<500> Service Unavailable!" + err)
        })
})

// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the modelRider first.
app.post('/motorcycle', (req, res) => {
    // console.log(req.body);

    let motor = new modelMotor.motorcycle(req.body);
    motor.save((err, data) => {
        if (err) {
            res.send("<404> Rider Not Found " + err);
        }
        res.send(data)
    })
})

// Question 8 - Create a HTTP Request to fetch all the motorcycles:
app.get('/motorcycle',(req,res) => {
    modelMotor.motorcycle.find({})
        .populate('riders')
        .exec((err,data) => {
            if (err) {
                res.send("<404> Rider Not Found " + err);
            }
            res.send(data)
        })
})

// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:


// BONUS 10 - Create a HTTP Request to to get the riders ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
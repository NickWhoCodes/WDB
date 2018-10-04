var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name: 'Yellowstone',
//         image: 'https://images.unsplash.com/photo-1524648365428-6bbe1d37c18a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=616d02546a6e31e2db0cad32b9019190&auto=format&fit=crop&w=500&q=60',
//         description: "It's as if nature has been untouched for thousands of years!"

//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Created a new campground!");
//             console.log(campground);
//         }
//     }
// )

app.get('/', function(req, res) {
    res.render('landing');
})

// INDEX - list of all campgrounds
app.get('/campgrounds', function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds});
        }
    })
    // res.render('campgrounds', {campgrounds});
})

// CREATE - create new campground
app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name, image, description};
    // Create new campground and save to db
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
})

// NEW - form for new campground
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
})

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id, function(err, found) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {campground: found});
        }
    })
})

app.listen(3000, function() {
    console.log('The server has started!');
})
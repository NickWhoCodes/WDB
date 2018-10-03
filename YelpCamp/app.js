var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose')

mongoose.connect('mongodb://locahost:27017/yelp_camp', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create(
    {
        name: 'Salmon Creek',
        image: 'https://images.unsplash.com/photo-1513309642960-b1d95a1b69f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=837f10a5b40b69c46e969d8ce31ee473&auto=format&fit=crop&w=500&q=60'

    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Created a new campground!");
            console.log(campground);
        }
    }
)

var campgrounds = [
    { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1513309642960-b1d95a1b69f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=837f10a5b40b69c46e969d8ce31ee473&auto=format&fit=crop&w=500&q=60' },
    { name: 'Yellowstone', image: 'https://images.unsplash.com/photo-1524648365428-6bbe1d37c18a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=616d02546a6e31e2db0cad32b9019190&auto=format&fit=crop&w=500&q=60' },
    { name: 'Grand Canyon', image: 'https://images.unsplash.com/photo-1535515505622-7621ebc4fc58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0e9ad1c57a31b2bc50d57b4f7abf985&auto=format&fit=crop&w=500&q=60' }
];

app.get('/', function(req, res) {
    res.render('landing');
})

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds});
})

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
})

app.post('/campgrounds', function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name, image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect('/campgrounds');
})

app.listen(3000, function() {
    console.log('The server has started!');
})
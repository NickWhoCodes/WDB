var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    seedDB      = require('./seeds');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
seedDB();

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
            res.render('campgrounds/index', {campgrounds});
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
    res.render('campgrounds/new');
})

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: found});
        }
    })
})

// COMMENTS ROUTES

app.get('/campgrounds/:id/comments/new', function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground});
        }
    })
})

app.post('/campgrounds/:id/comments', function(req, res) {
    //lookup campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect campground show page
})

app.listen(3000, function() {
    console.log('The server has started!');
})
var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// INDEX - list of all campgrounds
router.get('/', function(req, res) {
    // Get all campgrounds from db
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds, currentUser: req.user});
        }
    })
})

// CREATE - create new campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name, image, description, author};
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
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
})

// SHOW - shows more info about one campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: found});
        }
    })
})

// Edit campground
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, found) {
        res.render('campgrounds/edit', {campground: found});
    })
})

// Update campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, Updated) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Campground Updated.');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

// Delete camppground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Campground successfully deleted.');
            res.redirect('/campgrounds');
        }
    });
})

module.exports = router;
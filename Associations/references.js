var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true });

var Post = require('./models/post');
var User = require('./models/user');

Post.create({
    title: 'How to cook the best burger pt. 4',
    content: 'iueoiueiruqpoueoqurq'
}, function(err, post) {
    User.findOne({email: 'bob@gmail.com'}, function(err, found) {
        if(err) {
            console.log(err);
        } else {
            found.posts.push(post);
            found.save(function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            })
        }
    })
});

// Find user
// find all posts for that user

// User.findOne({email: 'bob@gmail.com'}).populate('posts').exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
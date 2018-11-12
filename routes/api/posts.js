const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//post modal
const Post = require('../../modals/Post');

//profile modal
const Profile = require('../../modals/Profile');

// validation
const validatePostInput = require('../../validation/post');

// route GET api/posts/test
// description test posts route
// access Public
router.get('/test', (req,res) => res.json({msg: "posts works"})
);

// route get api/posts
// description get read posts 
// access Public
router.get('/', (req,res) => {
    Post.find().sort({ date: -1 }).then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
});

// route get api/posts/:id
// description get read post by id
// access Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id).then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'No post found with that id' }));
});

// route post api/posts
// description create posts 
// access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //if any err
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post));
});

// route delete api/posts/:id
// description delete posts 
// access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            //check for post bu user
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'user not authorized' });
            }
            //delete
            post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    });
});

// route post api/posts/like/:id
// description like a post 
// access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'User already liked this post' });
            }
            //if not liked then add user idto likes array
            post.likes.unshift({ user: req.user.id });
            
            //save in db
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    });
});

// route post api/posts/unlike/:id
// description unlike a post 
// access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: 'You have not yet liked this post' });
            }
            // get remove index to find user which like is to remove
            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
            
            //spliceorremove the userlike out of the array
            post.likes.splice(removeIndex, 1);

            // save in db
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    });
});

// route post api/posts/comment/:id
// description add a comment 
// access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //if any err
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }
        //add to comment array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
    }).catch(err => res.status(404).json({ postnotfound: 'No post found '}));
});

// route delete api/posts/comment/:id/:comment_id
// description delete a comment 
// access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        // check if comment exists
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
            return res.status(404).json({ commentnotexists: 'Comment does not exists' });
        }
        // if comment exitx then get the remove index
        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        // to remove/splice it out of the array
        post.comment.splice(removeIndex, 1);

        // save it to db
        post.save().then(post => res.json(post));
    }).catch(err => res.status(404).json({ postnotfound: 'No post found '}));
});

module.exports = router;
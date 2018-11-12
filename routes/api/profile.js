const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// load profile modal
const Profile = require('../../modals/Profile');

// load user modal
const User = require('../../modals/User');

// route GET api/profle/test
// description test profile route
// access Public
router.get('/test', (req,res) => res.json({msg: "profile works"})
);

// route GET api/profile
// description get current user profile
// access Private
router.get('/', passport.authenticate('jwt', { session: false}), (req,res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'there is no profile for this user'
            return res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
});

// route get api/profile/all
// description get all profile
// access Public
router.get('/all', (req,res) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no profiless'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// route get api/profile/handle/:handle
// description get profile by handle
// access Public
router.get('/handle/:handle', (req,res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err)); 
});

// route get api/profile/user/:user_id
// description get profile by user id
// access Public
router.get('/user/:user_id', (req,res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            res.status(404).json(errors);
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json({profile: 'There is no profile for this user'})); 
});

// route post api/profile
// description create or update/edit user profile
// access Private
router.post('/', passport.authenticate('jwt', { session: false}), (req,res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validateion
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }
    // get fields
    const profileFields ={};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // skills-split into array of , seprated value
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.google) profileFields.social.google = req.body.google;

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        if(profile) {
            // update
            Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
            .then(profile => res.json(profile));
        }
        else {
            // create

            // check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if(profile) {
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }
                // save profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
});

// route post api/profile/experience
// description add experience to profile
// access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // check validateion
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // add to exp array to profile
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.json(profile));
    })
});

// route post api/profile/education
// description add education to profile
// access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req,res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // check validateion
    if(!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        }
        // add to edu array to profile
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.json(profile));
    });
});

// route delete api/profile/experience/:exp_id
// description delete education from profile
// access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req,res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
       // get experience then remove index
       const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

        // get splice out of array
        profile.experience.splice(removeIndex, 1);

        //save give bavk the updated profile
        profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
});

// route delete api/profile/experience/:edu_id
// description delete education from profile
// access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req,res) => {

    Profile.findOne({ user: req.user.id })
    .then(profile => {
       // get education then remove index
       const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

        // get splice out of array
        profile.education.splice(removeIndex, 1);

        //save give bavk the updated profile
        profile.save().then(profile => res.json(profile));
    }).catch(err => res.status(404).json(err));
});

// route delete api/profile
// description delete user and profile
// access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }));
    });
});

module.exports = router;
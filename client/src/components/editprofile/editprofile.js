import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Textfieldgroup from '../common/textfieldgroup';
import Textareafieldgroup from '../common/textareafieldgroup';
import Selectlistgroup from '../common/selectlistgroup';
import Inputgroup from '../common/inputgroup';
import { createprofile, getcurrentProfile } from '../../actions/profileaction';
import isEmpty from '../../validation/is-empty';

class Createprofile extends Component {
    state = {
        displaysocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        google: '',
        errors: {}
    }

    componentDidMount() {
        this.props.getcurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
        //for filling up the fields value from the db for editprofile
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            //bring skills arry back to comma seperated value(csv)
            const skillsCSV = profile.skills.join(',');
            // if profile is empty make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : '';
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
            profile.google = !isEmpty(profile.social.google) ? profile.social.google : '';
            
            //set component fields value state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram,
                google: profile.google
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const profiledata = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            google: this.state.google
        }
        this.props.createprofile(profiledata, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {

        const { errors, displaysocialInputs } = this.state;
        
        let socialInputs;

        if(displaysocialInputs) {
            socialInputs = (
                <div>
                   <Inputgroup placeholder="Twitter Profile URL" name="twitter" icon="fab fa-twitter" value={this.state.twitter} onChange={this.onChange.bind(this)} error={errors.twitter} />
                   <Inputgroup placeholder="Facebook Profile URL" name="facebook" icon="fab fa-facebook" value={this.state.facebook} onChange={this.onChange.bind(this)} error={errors.facebook} />
                   <Inputgroup placeholder="Instagram Profile URL" name="instagram" icon="fab fa-instagram" value={this.state.instagram} onChange={this.onChange.bind(this)} error={errors.instagram} />
                   <Inputgroup placeholder="linkedin Profile URL" name="linkedin" icon="fab fa-linkedin" value={this.state.linkedin} onChange={this.onChange.bind(this)} error={errors.linkedin} />
                   <Inputgroup placeholder="Youtube Profile URL" name="youtube" icon="fab fa-youtube" value={this.state.youtube} onChange={this.onChange.bind(this)} error={errors.youtube} />
                   <Inputgroup placeholder="google Profile URL" name="google" icon="fab fa-google" value={this.state.google} onChange={this.onChange.bind(this)} error={errors.google} />
                </div>
            )
        }

        //select option for status
        const options = [
            { label: '*Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer'},
            { label: 'Freelancer', value: 'Freelancer'},
            { label: 'Junior Developer', value: 'Junior Developer'},
            { label: 'Senior Developer', value: 'Senior Developer'},
            { label: 'Manager', value: 'Manager'},
            { label: 'Student or Learning', value: 'Student or Learning'},
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            { label: 'Intern', value: 'Intern'},
            { label: 'Other', value: 'Other'}
        ];

        return (
            <div class="create-profile">
            <div class="container">
              <div class="row">
                <div class="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">Go back</Link>
                  <h1 class="display-4 text-center">Edit Your Profile</h1>
                  <small class="d-block pb-3">* = required field</small>
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <Textfieldgroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange.bind(this)} error={errors.handle} info="A unique handle for your profile URL. Your full name, company name, nickname,"
                    />
                    <Selectlistgroup placeholder="Status" name="status" options={options} value={this.state.status} onChange={this.onChange.bind(this)} error={errors.status}  info="Give us an idea of where you are at in your career"/>
                    <Textfieldgroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange.bind(this)} error={errors.company} info="Could be your own company or one you work for"/>
                    <Textfieldgroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange.bind(this)} error={errors.website} info="Could be your own website or a company one"/>
                    <Textfieldgroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange.bind(this)} error={errors.location} info="Your Country"/>
                    <Textfieldgroup placeholder="* Skills" name="skills" value={this.state.skills} onChange={this.onChange.bind(this)} error={errors.skills} info="Please use comma separated values (eg CSS,HTML"/>
                    <Textfieldgroup placeholder="githubusername" name="githubusername" value={this.state.githubusername} onChange={this.onChange.bind(this)} error={errors.githubusername} info="If you want your latest repos and a Github link, include your username" />
                    <Textareafieldgroup placeholder="bio" name="bio" value={this.state.bio} onChange={this.onChange.bind(this)} error={errors.bio} info="Tell us a little about yourself"/>

                    <div className="mb-3">
                      <button type="button" onClick={() => {this.setState(prevState => ({
                          displaysocialInputs: !prevState.displaysocialInputs
                      }))}} className="btn btn-light">Add Social Network Links</button>
                      <span className="text-muted">Optional</span> 
                    </div>
                    {socialInputs}
                    <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Createprofile.propTypes = {
    createprofile: PropTypes.func.isRequired,
    getcurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createprofile, getcurrentProfile })(withRouter(Createprofile));
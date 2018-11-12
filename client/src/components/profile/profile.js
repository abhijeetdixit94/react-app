import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Profileabout from './profileabout';
import Profilecredi from './profilecredi';
import Profilegithub from './profilegithub';
import Profileheader from './profileheader';
import Spinner from '../common/spinner';
import { getprofilebyhandle } from '../../actions/profileaction';

class Profile extends Component {

    componentDidMount() {
        if(this.props.match.params.handle) {
            this.props.getprofilebyhandle(this.props.match.params.handle);
        }
    }

  render() {

    const { profile, loading } = this.props.profile;
    let profilecontent;

    if(profile === null || loading) {
        profilecontent = <Spinner />
    }
    else {
        profilecontent = (
        <div>
            <div class="row">
              <div class="col-6">
                 <Link to="/profiles" class="btn btn-light mb-3 float-left">Back To Profiles</Link>
              </div>
              <div className="col-md-6" />
            </div>
         <Profileheader profile={profile}/>
         <Profileabout profile={profile}/>
         <Profilecredi  education={profile.education} experience={profile.experience}/>
         {profile.githubusername ? (<Profilegithub username={profile.githubusername} />) : null}
        </div>
        );
    }

    return (
       <div className="profile">
         <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profilecontent}
            </div>
          </div>
         </div>  
       </div>
    );
  }
}

Profile.propTypes = {
    getprofilebyhandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getprofilebyhandle })(Profile);
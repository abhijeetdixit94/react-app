import React, { Component } from 'react';
import { connect } from 'react-redux';
import Profileitem from './profileitem';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getprofiles } from '../../actions/profileaction';

class Profiles extends Component {

    componentDidMount() {
        this.props.getprofiles();
    }

    render() {

        const { profiles, loading } = this.props.profile;
        let profileitems;

        if(profiles === null || loading) {
            profileitems = <Spinner />;
        }
        else {
            if(profiles.length > 0) {
             profileitems = profiles.map(profile => (
                 <Profileitem key={profile._id} profile={profile} />
             ))
            }
            else {
                profileitems = <h4>No profiles found...</h4>
            }
        }
        return (
            <div class="profiles">
              <div class="container">
                 <div class="row">
                   <div class="col-md-12">
                       <h1 class="display-4 text-center">Developer Profiles</h1>
                      <p class="lead text-center">Browse and connect with developers</p>
                    {profileitems}
                    </div>
                   </div>
                </div>
              </div>  
        );
    }
}

Profiles.propTypes = {
    getprofiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getprofiles })(Profiles);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getcurrentProfile, deleteAccount } from '../../actions/profileaction';
import Spinner from '../common/spinner';
import Profileaction from './profileactions';
import Experience from './experience';
import Education from './education';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getcurrentProfile();
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;
        if(profile === null || loading) {
            dashboardContent = <Spinner />
        }
        else {
            //check if user which is login has a profile 
            if(Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome 
                        <Link to={`/profile/${profile.handle}`}>
                          { user.name }
                        </Link></p>
                        <Profileaction />
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education} />
                        <div style={{ marginBottom: '60px' }} />
                        <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
                    </div>
                );
            }
            else {
                //user is login but not have a profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>You have not yet setup a profile please add some info to it</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
        }

        return(
            <div className="dashboard">
                <div className="container">
                  <div className="row">
                     <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                     </div>
                  </div>
                </div>
           </div>
        );
    }
}

Dashboard.propTypes = {
    getcurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getcurrentProfile, deleteAccount })(Dashboard);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutuser } from '../../actions/authactions';
import { clearcurrentProfile } from '../../actions/profileaction';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearcurrentProfile();
    this.props.logoutuser();
  }

  render() {

    const { isAuthenticate, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
       <li className="nav-item">
            <Link className="nav-link" to="/feed">Post Feed</Link>
         </li>
         <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
         </li>
         <li className="nav-item">
            <a href="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
               <img className="rounded-circle" src={user.avatar} alt={user.name} style={{ width: '25px', marginRight: '5px' }} title="You must have a Gravatar connected to your email to display an image" />
               Logout
            </a>
         </li>
      </ul>
    );

    const notauthLinks = (
      <ul className="navbar-nav ml-auto">
         <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
         </li>
         <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
         </li>
      </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Connect App</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
    
             { isAuthenticate ? authLinks : notauthLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutuser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutuser, clearcurrentProfile })(Navbar);
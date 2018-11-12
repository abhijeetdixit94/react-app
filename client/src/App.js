import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutuser } from './actions/authactions';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/authenticate/login';
import Register from './components/authenticate/register';
import Dashboard from './components/dashboard/dashboard';
import Createprofile from './components/createprofile/createprofile';
import Editprofile from './components/editprofile/editprofile';
import { clearcurrentProfile } from './actions/profileaction';
import PrivateRoute from './components/common/privateroute';
import Addexperience from './components/addcredentials/addexperience';
import Addeducation from './components/addcredentials/addeducation';
import Profiles from './components/profiles/profiles';
import Profile from './components/profile/profile';
import Posts from './components/post/post';
import Post from './components/singlepost/post';

//check for token
if(localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode the token and user information
  const decoded = jwt_decode(localStorage.jwtToken);
  // then we willl set user and authenticate it
  store.dispatch(setCurrentUser(decoded));
  //check if the token is expired
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    //logout the user
    store.dispatch(logoutuser());
    // clear current profile
    store.dispatch(clearcurrentProfile());
    // redirect to the loginpage
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
    <Provider store={ store }>
      <Router>
         <div className="App">
             <Navbar />
             <Route exact path="/" component={ Landing } />
             <div className="container">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/profiles" component={ Profiles } />
                <Route exact path="/profile/:handle" component={ Profile } />
                <Switch>
                    <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/create-profile" component={ Createprofile } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/edit-profile" component={ Editprofile } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/add-experience" component={ Addexperience } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/add-education" component={ Addeducation } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/feed" component={ Posts } />
                 </Switch>
                 <Switch>
                    <PrivateRoute exact path="/post/:id" component={ Post } />
                 </Switch>
             </div>
             <Footer />
          </div>
      </Router>
    </Provider>
    );
  }
}

export default App;

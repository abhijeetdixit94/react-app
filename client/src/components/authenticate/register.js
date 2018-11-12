import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registeruser } from '../../actions/authactions';
import Textfieldgroup from '../common/textfieldgroup';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        errors: {}       
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticate) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
          this.setState({ errors: nextProps.errors })
      }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value} )
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registeruser(userData, this.props.history);
      //  axios.post('/api/users/register', userData).then(res => console.log(res.data)).catch(err => this.setState({ errors: err.response.data }));
    }
  render() {

    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h4 className="display-4 text-center">Sign Up</h4>
              <p className="lead text-center">Create your account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
                <Textfieldgroup placeholder="Name" name="name" value={this.state.name} onChange={this.onChange.bind(this)} error={errors.name} />
                <Textfieldgroup type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange.bind(this)} error={errors.email} info="This site uses Gravatar so if you want a profile image, use a Gravatar email"/>
                <Textfieldgroup type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} error={errors.password} />
                <Textfieldgroup type="password" placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange.bind(this)} error={errors.password2} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>    
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registeruser })(withRouter(Register));
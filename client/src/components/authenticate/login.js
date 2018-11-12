import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginuser } from '../../actions/authactions';
import Textfieldgroup from '../common/textfieldgroup';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}        
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticate) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.auth.isAuthenticate) {
        this.props.history.push('/dashboard');
      }

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
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginuser(userData);
       // axios.post('/api/users/login', userData).then(res => console.log(res.data)).catch(err => this.setState({ errors: err.response.data }));
    }
  render() {

    const { errors } = this.state;

    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={this.onSubmit.bind(this)}>
              <Textfieldgroup type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange.bind(this)} error={errors.email} />
               <Textfieldgroup type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange.bind(this)} error={errors.password} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>     
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginuser })(Login);

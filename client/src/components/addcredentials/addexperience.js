import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Textfieldgroup from '../common/textfieldgroup';
import Textareafieldgroup from '../common/textareafieldgroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addexperience } from '../../actions/profileaction';

class Addexperience extends Component {
   
    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const expdata = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.addexperience(expdata, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck(e) {
        this.setState({disabled: !this.state.disabled, current: !this.state.current});
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="add-experience">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <Link to="/dashboard" className="btn btn-light">Go back</Link>
                    <h1 className="display-4 text-center">Add Experience</h1>
                    <p className="lead text-center">Add any job or position that you have had in the past or current</p>
                    <small className="d-block pb-3">*= required fields</small>
                    <form onSubmit={this.onSubmit.bind(this)}>
                      <Textfieldgroup
                        placeholder="* Company" name="company" value={this.state.company} error={errors.company}
                        onChange={this.onChange.bind(this)} />
                      <Textfieldgroup
                        placeholder="* Job Title" name="title" value={this.state.title} error={errors.title}
                        onChange={this.onChange.bind(this)} />
                        <Textfieldgroup
                        placeholder="Location" name="location" value={this.state.location} error={errors.location}
                        onChange={this.onChange.bind(this)} />
                        <h6>From Date</h6>
                        <Textfieldgroup
                        type="date" name="from" value={this.state.from} error={errors.from}
                        onChange={this.onChange.bind(this)} />
                        <h6>To Date</h6>
                        <Textfieldgroup
                        type="date" name="to" value={this.state.to} error={errors.to}
                        onChange={this.onChange.bind(this)} 
                        disabled={this.state.disabled ? 'disabled' : ''} />
                        <div className="form-check mb-4">
                          <input type="checkbox" className="form-check-input" name="current" value={this.state.current}
                          checked={this.state.current} onChange={this.onCheck.bind(this)} id="current" />
                          <label className="form-check-label" htmlFor="current">Current Job</label>
                        </div>
                        <Textareafieldgroup
                        placeholder="Job description" name="description" value={this.state.description} error={errors.description}
                        onChange={this.onChange.bind(this)} info="Tell us about the position"/>
                        <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

Addexperience.propTypes = {
    addexperience: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addexperience })(withRouter(Addexperience));
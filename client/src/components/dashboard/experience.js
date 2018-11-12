import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteexperience } from '../../actions/profileaction';

class Experience extends Component {

    onDeleteclick(id) {
        this.props.deleteexperience(id);
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
               <td>{exp.company}</td>
               <td>{exp.title}</td>
               <td><Moment format="DD/MM/YYYY">{exp.from}</Moment> - {exp.to === null ? (' Now Current') : 
               (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)} 
               </td>
               <td><button onClick={this.onDeleteclick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                  <thead>
                      <tr>
                          <th>Company</th>
                          <th>Title</th>
                          <th>Years</th>
                          <th></th>
                      </tr>
                      {experience}
                  </thead>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteexperience: PropTypes.func.isRequired
}

export default connect(null, { deleteexperience })(Experience);
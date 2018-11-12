import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteeducation } from '../../actions/profileaction';

class Education extends Component {

    onDeleteclick(id) {
        this.props.deleteeducation(id);
    }

    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
               <td>{edu.school}</td>
               <td>{edu.degree}</td>
               <td><Moment format="DD/MM/YYYY">{edu.from}</Moment> - {edu.to === null ? (' Now Current') : 
               (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)} 
               </td>
               <td><button onClick={this.onDeleteclick.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                  <thead>
                      <tr>
                          <th>School</th>
                          <th>Degree</th>
                          <th>Years</th>
                          <th></th>
                      </tr>
                      {education}
                  </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteeducation: PropTypes.func.isRequired
}

export default connect(null, { deleteeducation })(Education);
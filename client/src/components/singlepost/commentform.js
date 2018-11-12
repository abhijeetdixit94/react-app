import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textareafieldgroup from '../common/textareafieldgroup';
import { addcomment } from '../../actions/postaction';

class Commentform extends Component {

    state = {
        text: '',
        errors: {}
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(e) {
       e.preventDefault();
       const { user } = this.props.auth;
       const { postid } = this.props;

       const commentdata = {
           text: this.state.text,
           name: user.name,
           avatar: user.avatar
       };
 
       this.props.addcomment(postid, commentdata);
       this.setState({text: ''});
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a Comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group">
                    <Textareafieldgroup value={this.state.text} onChange={this.onChange.bind(this)} error={errors.text} 
                    className="form-control form-control-lg" placeholder="Reply to post" name="text" />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

Commentform.propTypes = {
    addcomment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postid: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addcomment })(Commentform);
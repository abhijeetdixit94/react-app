import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletecomment } from '../../actions/postaction';

class Commentitem extends Component {

    onDeleteClick(postid, commentid) {
        this.props.deletecomment(postid, commentid);
    }
   
  render() {

    const { comment, auth, postid } = this.props;

        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{comment.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{comment.text}</p>
                  {comment.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, comment._id, postid)}
                  type="button" className="btn btn-danger mr-1"><i className="fas fa-times"></i></button>) : null }
                </div>
              </div>
            </div>

        );
    }
}

Commentitem.propTypes = {
    comment: PropTypes.object.isRequired,
    deletecomment: PropTypes.func.isRequired,
    postid: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletecomment })(Commentitem);
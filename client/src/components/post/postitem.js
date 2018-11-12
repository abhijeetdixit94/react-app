import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletepost, like, removelike } from '../../actions/postaction';

class Postitem extends Component {

    onDeleteClick(id) {
        this.props.deletepost(id);
    }

    onLikeClick(id) {
        this.props.like(id);
    }

    onunLikeClick(id) {
        this.props.removelike(id);
    }

    findUserlike(likes) {
        const { auth } = this.props;
        if(likes.filter(liked => liked.user === auth.user.id).length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
  render() {

    const { post, auth, showActions } = this.props;

        return (
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                 {showActions ? (<span>
                    <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className={classnames('fas fa-thumbs-up', {'text-info': this.findUserlike(post.likes)})}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button onClick={this.onunLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </Link>
                  {post.user === auth.user.id ? (<button onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button" className="btn btn-danger mr-1"><i className="fas fa-times"></i></button>) : null }
                 </span>) : null}
                </div>
              </div>
            </div>

        );
    }
}

Postitem.defaultProps = {
    showActions: true
}

Postitem.propTypes = {
    post: PropTypes.object.isRequired,
    deletepost: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    removelike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletepost, like, removelike })(Postitem);
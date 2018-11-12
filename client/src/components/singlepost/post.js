import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getapost } from '../../actions/postaction';
import Postitem from '../post/postitem';
import Commentform from './commentform';
import Commentfeed from './commentfeed';

class Post extends Component {

    componentDidMount() {
        this.props.getapost(this.props.match.params.id);
    }
    render() {

        const { post, loading } = this.props.post;
        let postcontent;
        
        if(post === null || loading || Object.keys(post).length === 0) {
            postcontent = <Spinner />
        }
        else {
            postcontent = (<div><Postitem post={post} showActions={false} />
            <Commentform postid={post._id}/>
            <Commentfeed postid={post._id} comments={post.comments} />
            </div>)
        }
        return (
            <div className="post">
             <div className="container">
               <div className="row">
                 <div className="col-md-12">
                 <Link to="/feed" className="btn btn-light">Go back</Link>
                   {postcontent}
                 </div>
               </div>
             </div>
            </div>
        );
    }
}

Post.propTypes = {
    getapost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { getapost })(Post);
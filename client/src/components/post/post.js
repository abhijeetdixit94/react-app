import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Postform from './postform';
import Postfeed from './postfeed';
import Spinner from '../common/spinner';
import { getpost } from '../../actions/postaction';
import { Link } from 'react-router-dom';

class Post extends Component {

    componentDidMount() {
        this.props.getpost();
    }

    render() {

        const { posts, loading } = this.props.post;
        let postcontent;

        if(posts === null || loading) {
            postcontent = <Spinner />
        }
        else {
            postcontent = <Postfeed posts={posts} />
        }
        return (
            <div className="feed">
             <div className="container">
               <div className="row">
                 <div class="col-md-12">
                 <Link to="/dashboard" className="btn btn-light">Go back</Link>
                 <Postform />
                 {postcontent}
                 </div>
               </div>
             </div>
            </div>
        );
    }
}

Post.propTypes = {
    getpost:PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getpost })(Post);
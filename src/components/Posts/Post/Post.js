import React, {Component} from "react"
import './Post.css'
import {PostBar} from "../PostBar/PostBar";
import {PostSort} from "../PostSort/PostSort";
import {createPost, deletePost, editPost, getAllPosts, getCategoryPosts, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import Modal from 'react-modal'

import {getAllPostComments} from "../../../actions/commentsActions";
import {SinglePost} from "../PostList/SinglePost";
import PostSummary from "../../PostDisplay/PostSummary/PostSummary";
import Link from "react-router-dom/es/Link";
import {AddPost} from "./AddPost";

class Post extends Component {
    state = {
        loading: true,
        toPostSummary: false,
        postModalOpen: false,
        isAddPostClicked: false,
        isDeletePostClicked: false,

        sortByTitleAsc: false,
        sortByTitleDesc: false,
        sortByRatingAsc: false,
        sortByRatingDesc: false,
        sortByDateAsc: false,
        sortByDateDesc: false
    }
    onAddPostClick = (val) => {
        this.setState({isAddPostClicked: val, postModalOpen: true})
    }
    closeEditPostModal = () => this.setState(() => ({postModalOpen: false}))
    fetchCategoryPosts = (categoryId) => {
    }

    componentDidMount() {
        console.log("CCDDDDDDDDD", this.props)
        this.props.getAllPosts()
    }

    onDeleteClick = (id) => {
        console.log("clicked delete")
    }
    updatePost = (post) => {
        const updatedPost = {
            id: post.id,
            timestamp: Date.now(), //update with edit time
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
        }
        console.log("updatePost data_________________", updatedPost)
        this.props.editPost(updatedPost.id, updatedPost)
        this.closeEditPostModal()
    }

    componentDidUpdate(nextProps, prevState, snapshot) {
        console.log("__________________________|||||||||||______________________________")
        console.log("CDU nextProps", nextProps)
        console.log("CDU props", this.props)
        if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
            console.log("thre is an update man!!!!!!")
            this.props.getCategoryPosts(this.props.match.params.categoryId)
        }
        if (this.props.match.params.postId === undefined && nextProps.match.params.postId) {
            console.log("thre is an update man!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            this.props.getCategoryPosts(this.props.match.params.categoryId)
        }
        if (this.props.location.pathname === '/all' && nextProps.location.pathname !== '/all') {
            this.props.getAllPosts()
        }
    }

    onSubmitNewPost = (values) => {
        this.props.createPost(values).then(() => this.props.getCategoryPosts(this.props.match.params.categoryId))
        this.closeEditPostModal()
    }
    onToPostSummary = () => {
        this.setState({toPostSummary: true})
    }
    sortBy = (type, val) => {
        if (type === 'title') {
            if (val == 'asc') {
                this.setState({sortByTitleAsc: true})
                this.setState({sortByTitleDesc: false})

                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})




            }
            if (val == 'desc') {
                this.setState({sortByTitleDesc: true})
                this.setState({sortByTitleAsc: false})

                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})


            }
        }
        if (type === 'rating') {
            if (val == 'asc') {
                this.setState({sortByRatingAsc: true})
                this.setState({sortByRatingDesc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})

            }
            if (val == 'desc') {
                this.setState({sortByRatingDesc: true})
                this.setState({sortByRatingAsc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})

            }
        }
        if (type === 'date') {
            if (val == 'asc') {
                this.setState({sortByDateAsc: true})
                this.setState({sortByDateDesc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})

            }
            if (val == 'desc') {
                this.setState({sortByDateDesc: true})
                this.setState({sortByDateAsc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})

            }
        }

    }


    render() {

        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        console.log("Post render props:");
        console.log("props Post ", this.props);
        const divStyle = {
            backgroundColor: '#b65b1d', // note the capital 'W' here
        };

        if (this.state.sortByTitleAsc === true) {

            var posts = _.sortBy(this.props.posts, p => p.title.toLowerCase())
        }
        else if (this.state.sortByTitleDesc === true) {
            var posts = _.sortBy(this.props.posts, p => p.title.toLowerCase()).reverse()
        }
        else if (this.state.sortByRatingAsc === true) {
            var posts = _.sortBy(this.props.posts, p => p.voteScore)
        }
        else if (this.state.sortByRatingDesc === true) {
            var posts = _.sortBy(this.props.posts, p => p.voteScore).reverse()
        }
        else if (this.state.sortByDateAsc === true) {
            var posts = _.sortBy(this.props.posts, p => p.timestamp)
        }
        else if (this.state.sortByDateDesc === true) {
            var posts = _.sortBy(this.props.posts, p => p.timestamp).reverse()
        }
        else {
            var posts = {...this.props.posts}

        }
        return (
            <div className={'post-container'}>
                <div>
                    <div className={'post-bar'}>
                        <div className={"post-bar-header"}>
                            <h1>Posts</h1></div>
                        <div className={"search-posts"}><i className="fas fa-search"></i>
                        </div>
                        <div className={'add-post'}><i className="fas fa-plus"
                                                       onClick={() => this.onAddPostClick(true)}>
                            {
                                this.state.isAddPostClicked
                                    ? <div>
                                        <Modal
                                            isOpen={this.state.postModalOpen}
                                            onRequestClose={this.closeEditPostModal}
                                        >
                                            <AddPost onSubmitNewPost={this.onSubmitNewPost}
                                                     authUser={this.state.authUser}/>

                                        </Modal>
                                    </div>
                                    : null
                            }
                        </i>
                        </div>
                    </div>
                    <PostSort sortBy={this.sortBy}/>
                    <div className={'post-yo'}>
                        {




                            _.map(posts, p =>
                                (
                                        <div className={"hh"}>
                                            <div className={'post-list'}>
                                                <div className={'rating'}>
                                                    <div>
                                                        <i className="fas fa-thumbs-up"
                                                           onClick={() => this.props.votePost(p.id, 'upVote')}/>
                                                    </div>
                                                    <div>
                                                        {p.voteScore}
                                                    </div>
                                                    <div>
                                                        <i className="fas fa-thumbs-down"
                                                           onClick={() => this.props.votePost(p.id, 'downVote')}/>
                                                    </div>
                                                </div>
                                                <div className={'post'}>
                                                    <Link className={'no-u'} to={`/${p.category}/${p.id}`}>{p.title}</Link>
                                                    {/*{p.title}*/}
                                                </div>
                                                <div className={'post-footer'}>
                                                    <div className={'post-footer comments'}><i
                                                        className="far fa-comment"/>
                                                    </div>
                                                    <div className={'post-footer author'}>
                                                        <i className="far fa-user">
                                                            {p.author}
                                                        </i>
                                                    </div>
                                                    <div className={'post-footer date'}>
                                                        <i className="far fa-calendar-alt">
                                                            {p.timestamp}
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                )
                            )
                        }
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Post state: ", state)


    return {
        posts: state.posts,
        authUser: state.authUser
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllPosts: () => dispatch(getAllPosts()),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),
    createPost: (values) => dispatch(createPost(values)),


    getCategoryPosts: (categoryId) => dispatch(getCategoryPosts(categoryId)),
    deletePost: (postId) => dispatch(deletePost(postId)),

    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Post)

import React, {Component} from "react"
import './Post.css'
import AddIcon from '@material-ui/icons/Add';

import {PostBar} from "../PostBar/PostBar";
import {PostSort} from "../PostSort/PostSort";
import {createPost, deletePost, editPost, getAllPosts, getCategoryPosts, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import Modal from '@material-ui/core/Modal';
import {API} from "aws-amplify";


import {getAllPostComments} from "../../../actions/commentsActions";
import {SinglePost} from "../PostList/SinglePost";
import PostSummary from "../../PostDisplay/PostSummary/PostSummary";
import Link from "react-router-dom/es/Link";
import AddPost from "./AddPost";
import Button from "@material-ui/core/es/Button/Button";

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

        this.props.getAllPosts()

        // const post= await this.getPost()
        // console.log("bro the post is+++++", post)


        // console.log("CCDDDDDDDDD", this.props)
        //
        //
        // this.props.getAllPosts()
        // // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",note)


    }


    onDeleteClick = (id) => {
        // console.log("clicked delete")
    }
    updatePost = (post) => {
        const updatedPost = {
            postId: post.id,
            time_stamp: Date.now(), //update with edit time
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
        }
        // console.log("updatePost data_________________", updatedPost)
        this.props.editPost(updatedPost.id, updatedPost)
        this.closeEditPostModal()
    }

    componentDidUpdate(nextProps, prevState, snapshot) {
        console.log("__________________________POSTS______________________________")

        console.log("CDU POST nextProps", nextProps)
        // console.log("POST CDU props", this.props)
        if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
            console.log("dff")
            if (this.props.match.params.categoryId === 'all') {
                this.props.getAllPosts()

            }
            else {
                this.props.getCategoryPosts(this.props.match.params.categoryId)

            }
            // console.log("thre is an update man!!!!!!")
            // console.log("this.props.match.params.categoryId", this.props.match.params.categoryId)

        }
    }

    // if (this.props.match.params.postId === undefined && nextProps.match.params.postId) {
    //     // console.log("thre is an update man!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     this.props.getCategoryPosts(this.props.match.params.categoryId)
    // }
    // if (this.props.location.pathname === '/all' && nextProps.location.pathname !== '/all') {
    //     this.props.getAllPosts()
    // }


    onSubmitNewPost = (values) => {
        console.log("form", values)

        this.props.createPost(values).then(() => this.props.history.push({pathname: `/${values.category}`}))
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
        // console.log("Post render props:");
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
            var posts = _.sortBy(this.props.posts, p => p.time_stamp)
        }
        else if (this.state.sortByDateDesc === true) {
            var posts = _.sortBy(this.props.posts, p => p.time_stamp).reverse()
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
                        {/*<div className={"search-posts"}><i className="fas fa-search"></i>*/}
                        {/*</div>*/}
                        <div className={'search-posts'}>
                            <Button variant="fab" color="primary" aria-label="add"  onClick={() => this.onAddPostClick(true)} >
                                <AddIcon />
                                {
                                    this.state.isAddPostClicked
                                        ? <div>
                                            <Modal
                                                aria-labelledby="simple-modal-title"
                                                aria-describedby="simple-modal-description"
                                                open={this.state.postModalOpen}
                                                onClose={this.closeEditPostModal}
                                            >
                                                <AddPost onSubmitNewPost={this.onSubmitNewPost}
                                                         authUser={this.props.authUser}
                                                />

                                            </Modal>
                                        </div>
                                        : null
                                }
                            </Button>


                        </div>
                    </div>
                    <PostSort sortBy={this.sortBy}/>
                    <div className={'post-yo'}>
                        {


                            _.map(posts, p =>
                                (
                                    <div className={"hh"} key={p.postId}>
                                        <div className={'post-list'}>
                                            <div className={'rating'}>
                                                <div>
                                                    <i className="fas fa-caret-up"
                                                       onClick={() => this.props.votePost(p.postId, {option:'upVote',userId:p.userId})}/>
                                                </div>
                                                <div>
                                                    {p.voteScore}
                                                </div>
                                                <div>
                                                    <i className="fas fa-caret-down"
                                                       onClick={() => this.props.votePost(p.postId, {option:'downVote',userId:p.userId})}/>
                                                </div>
                                            </div>
                                            <div className={'post'}>
                                                <Link className={'no-u'}
                                                      to={`/${p.category}/${p.postId}`}>{p.title}</Link>
                                                {/*{p.title}*/}
                                            </div>
                                            <div className={'post-footer'}>
                                                {/*<div className={'post-footer comments'}><i*/}
                                                    {/*className="far fa-comment"/>*/}
                                                    {/*{this.props.commentCount}*/}
                                                {/*</div>*/}
                                                <div className={'post-footer comments'}>

                                                    <i className="far fa-user">
                                                      {p.author}
                                                    </i>
                                                </div>
                                                <div className={'post-footer date'}>
                                                    <i className="far fa-calendar-alt">
                                                        {p.time_stamp}
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
    console.log("ZZZZZZZZZZZZZZZZZZZZ>>>>>>>>>>>............", state)


    return {
        commentCount: Object.keys(state.comments).length,

        posts: state.posts,
        authUser: state.authUser,
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
{/*<div className={'post-container'}>*/
}
{/*<div>*/
}
{/*<div className={'post-bar'}>*/
}
{/*<div className={"post-bar-header"}>*/
}
{/*<h1>Posts</h1></div>*/
}
{/*<div className={"search-posts"}><i className="fas fa-search"></i>*/
}
{/*</div>*/
}
{/*<div className={'add-post'}><i className="fas fa-plus"*/
}
{/*onClick={() => this.onAddPostClick(true)}>*/
}
{/*{*/
}
{/*this.state.isAddPostClicked*/
}
{/*? <div>*/
}
{/*<Modal*/
}
{/*isOpen={this.state.postModalOpen}*/
}
{/*onRequestClose={this.closeEditPostModal}*/
}
{/*>*/
}
{/*<AddPost onSubmitNewPost={this.onSubmitNewPost}*/
}
{/*authUser={this.state.authUser}/>*/
}

{/*</Modal>*/
}
{/*</div>*/
}
{/*: null*/
}
{/*}*/
}
{/*</i>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*<PostSort sortBy={this.sortBy}/>*/
}
{/*<div className={'post-yo'}>*/
}
{/*{*/
}


{/*_.map(posts, p =>*/
}
{/*(*/
}
{/*<div className={"hh"} key={p.postId}>*/
}
{/*<div className={'post-list'}>*/
}
{/*<div className={'rating'}>*/
}
{/*<div>*/
}
{/*<i className="fas fa-caret-up"*/
}
{/*onClick={() => this.props.votePost(p.postId, 'upVote')}/>*/
}
{/*</div>*/
}
{/*<div>*/
}
{/*{p.voteScore}*/
}
{/*</div>*/
}
{/*<div>*/
}
{/*<i className="fas fa-caret-down"*/
}
{/*onClick={() => this.props.votePost(p.postId, 'downVote')}/>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*<div className={'post'}>*/
}
{/*<Link className={'no-u'} to={`/${p.category}/${p.id}`}>{p.title}</Link>*/
}
{/*/!*{p.title}*!/*/
}
{/*</div>*/
}
{/*<div className={'post-footer'}>*/
}
{/*<div className={'post-footer comments'}><i*/
}
{/*className="far fa-comment"/>*/
}
{/*</div>*/
}
{/*<div className={'post-footer author'}>*/
}
{/*<i className="far fa-user">*/
}
{/*{p.author}*/
}
{/*</i>*/
}
{/*</div>*/
}
{/*<div className={'post-footer date'}>*/
}
{/*<i className="far fa-calendar-alt">*/
}
{/*{p.timestamp}*/
}
{/*</i>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*</div>*/
}
{/*</div>*/
}

{/*)*/
}
{/*)*/
}
{/*}*/
}
{/*</div>*/
}

{/*</div>*/
}
{/*</div>*/
}
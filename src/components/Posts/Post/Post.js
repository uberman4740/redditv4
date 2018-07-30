import React, {Component} from "react"
import './Post.css'
import AddIcon from '@material-ui/icons/Add';
import en from 'javascript-time-ago/locale/en'
import {PostSort} from "../PostSort/PostSort";
import {createPost, deletePost, editPost, getAllPosts, getCategoryPosts, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import Modal from '@material-ui/core/Modal';

import Link from "react-router-dom/es/Link";
import AddPost from "./AddPost";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import TimeAgo from 'javascript-time-ago'

TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')
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
        this.props.editPost(updatedPost.id, updatedPost)
        this.closeEditPostModal()
    }

    componentDidUpdate(nextProps, prevState, snapshot) {
        console.log("__________________________POSTS______________________________")

        console.log("CDU POST nextProps", nextProps)
        if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
            console.log("dff")
            if (this.props.match.params.categoryId === 'all') {
                this.props.getAllPosts()

            }
            else {
                this.props.getCategoryPosts(this.props.match.params.categoryId)

            }

        }
    }


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
            if (val === 'asc') {
                this.setState({sortByTitleAsc: true})
                this.setState({sortByTitleDesc: false})

                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})


            }
            if (val === 'desc') {
                this.setState({sortByTitleDesc: true})
                this.setState({sortByTitleAsc: false})

                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})


            }
        }
        if (type === 'rating') {
            if (val === 'asc') {
                this.setState({sortByRatingAsc: true})
                this.setState({sortByRatingDesc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})

            }
            if (val === 'desc') {
                this.setState({sortByRatingDesc: true})
                this.setState({sortByRatingAsc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByDateAsc: false})
                this.setState({sortByDateDesc: false})

            }
        }
        if (type === 'date') {
            if (val === 'asc') {
                this.setState({sortByDateAsc: true})
                this.setState({sortByDateDesc: false})

                this.setState({sortByTitleDesc: false})
                this.setState({sortByTitleAsc: false})
                this.setState({sortByRatingAsc: false})
                this.setState({sortByRatingDesc: false})

            }
            if (val === 'desc') {
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
        let posts;
        if (this.state.sortByTitleAsc === true) {

             posts = _.sortBy(this.props.posts, p => p.title.toLowerCase())
        }
        else if (this.state.sortByTitleDesc === true) {
             posts = _.sortBy(this.props.posts, p => p.title.toLowerCase()).reverse()
        }
        else if (this.state.sortByRatingAsc === true) {
             posts = _.sortBy(this.props.posts, p => p.voteScore)
        }
        else if (this.state.sortByRatingDesc === true) {
             posts = _.sortBy(this.props.posts, p => p.voteScore).reverse()
        }
        else if (this.state.sortByDateAsc === true) {
             posts = _.sortBy(this.props.posts, p => p.time_stamp)
        }
        else if (this.state.sortByDateDesc === true) {
             posts = _.sortBy(this.props.posts, p => p.time_stamp).reverse()
        }
        else {
             posts = {...this.props.posts}

        }
        return (

            <div className={'post-container'}>
                <div>
                    <div className={'post-bar'}>
                        <div className={"post-bar-header"}>
                            <h1>Posts</h1></div>
                        <div className={'search-posts'}>
                            <Button variant="fab" color="primary" aria-label="add"
                                    onClick={() => this.onAddPostClick(true)}>
                                <AddIcon/>
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
                </div>

                    <div className={'post-yo'}>
                        {


                            _.map(posts, p =>
                                (
                                    <div className={"hh"} key={p.postId}>
                                        <div className={'post-list'}>
                                            <div className={'rating'}>

                                                <div className={'upvote'}>
                                                    <IconButton
                                                       onClick={() => this.props.votePost(p.postId, {
                                                           option: 'upVote',
                                                           userId: p.userId
                                                       })}>
                                                    <ArrowDropUp/>
                                                    </IconButton>
                                                </div>
                                                <div className={'score'}>
                                                    {p.voteScore}
                                                </div>

                                                <div className={'downvote'}>

                                                    <IconButton
                                                        onClick={() => this.props.votePost(p.postId, {
                                                            option: 'downVote',
                                                            userId: p.userId
                                                        })}>
                                                        <ArrowDropDown/>

                                                    </IconButton>

                                                </div>
                                            </div>

                                            <Link className={'no-u'}
                                                  to={`/${p.category}/${p.postId}`}>
                                                <div className={'post ripple'}>
                                                    {p.title}
                                                </div>
                                            </Link>
                                            {/*{p.title}*/}

                                            <div className={'post-footer'}>
                                                <div className={'post-footer comments'}><i
                                                className="far fa-comment"/>
                                                {p.commentsCount}
                                                </div>


                                                <div className={'post-footer date'}>
                                                    <i className="far fa-calendar-alt">
                                                        {" "}{timeAgo.format(p.time_stamp, 'twitter')}


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

        );
    }
}

const mapStateToProps = (state) => {
    return {
        commentCount: Object.keys(state.comments).length,

        posts: state.posts,
        authUser: state.authUser,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllPosts: () => dispatch(getAllPosts()),
    createPost: (values) => dispatch(createPost(values)),
    getCategoryPosts: (categoryId) => dispatch(getCategoryPosts(categoryId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data))

})


export default connect(mapStateToProps, mapDispatchToProps)(Post)

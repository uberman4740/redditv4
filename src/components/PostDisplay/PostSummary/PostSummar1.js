import React, {Component} from 'react'
import './PostSummary.css';
import {PostSummarBar} from "../PostSummaryBar/PostSummarBar";
import Comments from "../../Comments/Comments";
import {deletePost, editPost, getCategoryPosts, getPost, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import AddComment from "../../Comments/AddComment";
import {getAllPostComments} from "../../../actions/commentsActions";
import Modal from 'react-modal'
import {EditPost} from "./EditPost";
import Link from "react-router-dom/es/Link";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {API} from "aws-amplify";
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ModeComment from '@material-ui/icons/ModeComment';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

import Divider from '@material-ui/core/Divider';

import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import './PostSummary.css';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';

import './PostSummary.css';
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Paper from "@material-ui/core/es/Paper/Paper";
import Comments1 from "../../Comments/Comments1";

class PostSummary1 extends Component {
    state = {
        isAddCommentClicked: false,
        postModalOpen: false,
        loadPost: false
    }

    componentDidMount() {
        // try {
        //
        //     const post = await this.getPost()
        //     // this.setState({post: post})
        //     // console.log("bro the post is+++++", post)
        // } catch (e) {
        //     alert(e)
        // }

        // console.log("CCDDDDDDDDD", this.props)
        //
        //
        // this.props.getAllPosts()
        // // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",note)


    }


    // componentDidMount() {
    //     console.log("PostSummary CDM props: ", this.props)
    //
    // }
    componentDidUpdate(nextProps, prevState, snapshot) {
        console.log("__________________________|||||||||||______________________________")
        console.log("CDU nextProps", nextProps)
        console.log("POST CDU props", this.props)
        if (this.props.match.params.postId !== nextProps.match.params.postId) {
            if (!this.props.match.params.postId) {
                this.setState({loadPost: false})


            } else {


                this.props.getPost(this.props.match.params.postId)
                this.setState({loadPost: true})

            }


        }
    }

    openEditPostModal = () => this.setState(() => ({postModalOpen: true}))
    closeEditPostModal = () => {
        this.setState(() => ({postModalOpen: false}))
    }

    onDeleteClick = (id) => {
        this.props.deletePost(id)
        // .then(() => this.props.history.push(`/${this.props.match.params.categoryId}`))
    }
    onSubmitEditPost = (id, value) => {
        const updatedPost = {
            postId: id,
            title: value.title,
            body: value.body,
            category: value.category,
            author: value.author,
            time_stamp: value.timestamp
        }
        // console.log("updatePost data_________________", updatedPost)
        this.props.editPost(updatedPost.id, updatedPost)
        this.props.history.push(`/${updatedPost.category}/${updatedPost.id}`)
        this.closeEditPostModal()
    }
    // onAddComment =()=>{
    //
    // }
    render() {
        console.log("PostSummary Render  state: ", this.props.post)
        console.log("PostSummary params  state: ", this.props.match.params.postId)


        return (
            <div className={'post-summary-container'}>
                <PostSummarBar/>
                {!this.state.loadPost
                    ? null
                    : <div>
                        <Card>
                            <CardHeader
                                title={this.props.post.title}
                                subheader={this.props.post.time_stamp}

                            />
                            <CardContent>

                                <Typography paragraph>
                                    {this.props.post.body}                         </Typography>
                                <div>
                                    <IconButton onClick={() => this.props.votePost(this.props.post.postId, {
                                        option: 'upVote',
                                        userId: this.props.post.userId
                                    })}>

                                        <ArrowDropUp/>
                                    </IconButton>

                                    <span className={'vote-score'}>{this.props.post.voteScore}</span>
                                    <IconButton onClick={() => this.props.votePost(this.props.post.postId, {option:'downVote',userId:this.props.post.userId})}>
                                        <ArrowDropDown/>
                                    </IconButton>

                                    <IconButton onClick={() => this.onDeleteClick(this.props.post.postId)}>
                                        <Link to={`/${this.props.post.category}`}>
                                        <Delete/>
                                        </Link>
                                    </IconButton>
                                    <IconButton>
                                        <ModeComment/>
                                    </IconButton>
                                    <span>4</span>

                                    <IconButton aria-label="Next" bsSize="large"
                                    >
                                        <Edit/>
                                    </IconButton>
                                </div>


                                <Comments1 postId={this.props.match.params.postId}
                                          onAddComment={this.onAddComment}
                                />



                            </CardContent>


                        </Card>
                    </div>
                }
            </div>

        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log("PostSummary state: ", state.posts[ownProps.match.params.postId])

    console.log("PostSummary ownprops", ownProps)
    if (ownProps.match.params.postId === undefined) {
        return {
            post: "",
            categories: state.categories
        }
    }
    else {
        return {

            post: state.posts[ownProps.match.params.postId],

            categories: state.categories
        }
    }

}

const mapDispatchToProps = (dispatch) => ({
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data)),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary1)

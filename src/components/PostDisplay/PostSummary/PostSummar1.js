import React, {Component} from 'react'
import './PostSummary.css';
import {PostSummarBar} from "../PostSummaryBar/PostSummarBar";
import {deletePost, editPost, getCategoryPosts, getPost, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import Modal from 'react-modal'
import {EditPost} from "./EditPost";
import Link from "react-router-dom/es/Link";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ModeComment from '@material-ui/icons/ModeComment';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import './PostSummary.css';
import './PostSummary.css';
import Comments1 from "../../Comments/Comments1";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')
class PostSummary1 extends Component {
    state = {
        isAddCommentClicked: false,
        postModalOpen: false,
        loadPost: false,
        commentCount: '',
        formattedTime:''
    }

    componentDidMount() {

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
                this.setState({loadPost: true,formattedTime:timeAgo.format(this.props.post.time_stamp, 'twitter')})
            }
        }
    }
    coolMethod(){
        this.setState({loading: true})
    }

    getCommentCount = (count) => {
        // alert("comment count",count)
        this.setState({commentsCount: count})
    }
    openEditPostModal = () => this.setState(() => ({postModalOpen: true}))
    closeEditPostModal = () => {
        this.setState(() => ({postModalOpen: false}))
    }
    onDeleteClick = (id,userId) => {
        this.props.deletePost(id,userId)
        // .then(() => this.props.history.push(`/${this.props.match.params.categoryId}`))
    }
    onSubmitEditPost = (value) => {
        const updatedPost = {
            postId: value.postId,
            title: value.title,
            body: value.body,
            category: value.category,
            author: value.author,
            time_stamp: value.time_stamp,
            userId:value.userId

        }
        console.table(updatedPost)
        this.props.editPost(updatedPost.postId, {
            body: updatedPost.body,
            title: updatedPost.title,
            time_stamp: updatedPost.time_stamp,
            userId:updatedPost.userId
        })
        this.props.history.push(`/${updatedPost.category}/${updatedPost.postId}`)
        this.closeEditPostModal()
    }

    render() {
        console.log("PostSummary Render  state: ", this.props.post)
        console.log("PostSummary params  state: ", this.props.match.params.postId)
        console.log("PostSummary state~~~~~~~~~~~~~~~~~~~: ", this.state)

        // alert(this.state.commentCount)
        return (
            <div className={'post-summary-container'}>
                <PostSummarBar/>
                {(!this.state.loadPost)
                    ? null
                    : <div>
                        <Card>
                            <CardHeader
                                title={this.props.post.title}
                                subheader={ this.state.formattedTime}

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
                                    <IconButton onClick={() => this.props.votePost(this.props.post.postId, {
                                        option: 'downVote',
                                        userId: this.props.post.userId
                                    })}>
                                        <ArrowDropDown/>
                                    </IconButton>
                                    {
                                        (this.props.authUser === this.props.post.author)
                                            ? <IconButton onClick={() => this.onDeleteClick(this.props.post.postId,this.props.post.userId)}>
                                                <Link to={`/${this.props.post.category}`}>
                                                    <Delete/>
                                                </Link>
                                            </IconButton>
                                            : null
                                    }


                                    <IconButton>
                                        <ModeComment/>
                                    </IconButton>
                                    <span style={{color: 'black'}}>{this.props.commentCount}</span>
                                    {
                                        (this.props.authUser === this.props.post.author)
                                            ? <IconButton aria-label="Next" bsSize="large"
                                                          onClick={this.openEditPostModal}>
                                                <Modal
                                                    isOpen={this.state.postModalOpen}
                                                    onRequestClose={this.closeEditPostModal}>
                                                    <EditPost
                                                        onSubmitEditPost={this.onSubmitEditPost}
                                                        post={this.props.post}/>
                                                </Modal>
                                                <Edit/>
                                            </IconButton>
                                            : null
                                    }


                                </div>


                                <Comments1 postId={this.props.match.params.postId}
                                           userId={this.props.post.userId}
                                           onAddComment={this.onAddComment}
                                           coolMethod = {this.coolMethod}
                                           onCommentCountChange={(commentCount) => this.setState({commentCount})}/>


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
    console.log("~~~~~~~~~##!!!!!~~~~~", state)


    console.log("PostSummary ownprops", ownProps)
    if (ownProps.match.params.postId === undefined) {
        return {
            post: "",
            categories: state.categories,
            authUser: state.authUser
        }
    }
    else {
        return {
            commentCount: Object.keys(state.comments).length,

            post: state.posts[ownProps.match.params.postId],

            categories: state.categories,
            authUser: state.authUser

        }
    }

}

const mapDispatchToProps = (dispatch) => ({
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId,userId) => dispatch(deletePost(postId,userId)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data)),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary1)

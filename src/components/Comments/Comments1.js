import React, {Component} from 'react'
import './Comments.css'
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import {deleteComment, editComment, getAllPostComments, voteComment} from "../../actions/commentsActions";
import Modal from 'react-modal'
import {CommentEdit} from "./CommentEdit";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddComment1 from "./AddComment1";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import Divider from "@material-ui/core/Divider";
import TimeAgo from 'javascript-time-ago'

const timeAgo = new TimeAgo('en-US')
class Comments1 extends Component {
    state = {
        isAddCommentClicked: false,
        postModalOpen: false,
        loading: true,
        formattedTime:''

    }

    componentDidMount() {
        console.log("MOUNTING COMPONENT:", "COMMENTS")

        this.props.getPostComments(this.props.postId).then(() => this.setState({loading: false}))
        // this.props.onCommentCountChange(Object.keys(this.props.comments).length)


    }

    componentDidUpdate(nextProps) {


        console.log("NEXPROPS POSTS ID", nextProps.postId)
        console.log("THIS PROPS POST ID", this.props.postId)
        if (nextProps.postId !== this.props.postId) {
            this.props.getPostComments(this.props.postId).then(() => this.setState({loading: false}))
        }

    }

    getCommentCount = () => {
        return Object.keys(this.props.comments).length

    }
    openEditPostModal = () => this.setState(() => ({postModalOpen: true}))
    closeEditPostModal = () => this.setState(() => ({postModalOpen: false}))


    onDeleteClick = (id, postId) => {


        this.props.deleteComment(id, postId)
            .then(() => this.props.getPostComments(this.props.postId)).then(()=>this.props.coolMethod
        )
    }
    onAddCommentClick = (val) => {
        this.setState({isAddCommentClicked: val})
    }
    updateComment = (comment) => {
        const updatedComment = {
            commentId: comment.commentId,
            body: comment.body,

        }
        this.props.editComment(updatedComment.commentId, {body: updatedComment.body, postId: this.props.postId})
        this.closeEditPostModal()
    }
    renderComments() {
        console.log("dskfjnsadkjfnsakjdnfaskjfn++++++++++", this.comments)

        return _.map(this.props.comments, c => {
            return (
                <Paper elevation={0}>
                    {
                        this.state.loading
                            ? null
                            : <div>
                                <Modal
                                    isOpen={this.state.postModalOpen}
                                    onRequestClose={this.closeEditPostModal}
                                >
                                    {this.state.postModalOpen &&
                                    <CommentEdit
                                        initialValue={{commentId: c.commentId, body: c.body}}
                                        onSub={this.updateComment}
                                        closeModal={this.closeEditPostModal}

                                    />}

                                </Modal>

                                <div>
                                    <Typography variant="body2">
                                        {c.author}


                                    </Typography>
                                    <div>
                                        <Typography variant="caption" gutterBottom>

                                            {timeAgo.format(c.time_stamp, 'twitter')}

                                        </Typography>
                                    </div>
                                </div>


                                <Typography>
                                    {c.body}
                                </Typography>
                                <IconButton className={'c-button'}
                                            onClick={() => this.props.voteComment(c.commentId, {
                                                option: 'upVote',
                                                postId: c.postId
                                            })}>
                                    <ArrowDropUp/>
                                </IconButton>
                                <span className={'c-button'}>{c.voteScore}</span>
                                <IconButton className={'c-button'}
                                            onClick={() => this.props.voteComment(c.commentId, {
                                                option: 'downVote',
                                                postId: c.postId
                                            })}>
                                    <ArrowDropDown/>
                                </IconButton>

                                <IconButton className={'c-button'}
                                            onClick={() => this.onDeleteClick(c.commentId, c.postId)}>
                                    <Delete/>
                                </IconButton>
                                <IconButton onClick={this.openEditPostModal} className={'c-button'}>
                                    <Edit/>
                                </IconButton>

                            </div>}

                </Paper>

            )
        })
    }


    render() {
        console.log("Comments Render  state: ", this.state)


        return (
            <div>

                {
                    !this.state.loading
                        ? <div>
                            <div className={'c-add'} onClick={() => this.onAddCommentClick(true)}>
                                {
                                    this.state.isAddCommentClicked
                                        ? <AddComment1 postId={this.props.postId} userId={this.props.userId} commentClicked={this.onAddCommentClick}/>
                                        :
                                        <div>
                                            <Button block
                                                    bsSize="small"
                                                    color="primary"
                                                    variant="contained" type="submit">ADD COMMENT
                                            </Button>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <Divider/>
                                        </div>


                                }

                            </div>


                            <div> {this.renderComments()}</div>

                        </div>
                        : null
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch) => ({
    getPostComments: (postId) => dispatch(getAllPostComments(postId)),
    deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    editComment: (id, data) => dispatch(editComment(id, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments1)


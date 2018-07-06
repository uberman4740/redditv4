import React, {Component} from 'react'
import './Comments.css'
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import {deleteComment, editComment, getAllPostComments, voteComment} from "../../actions/commentsActions";
import AddComment from "./AddComment";
import Modal from 'react-modal'
import {CommentEdit} from "./CommentEdit";
import Typography from "@material-ui/core/es/Typography/Typography";
import Paper from "@material-ui/core/es/Paper/Paper";
import AddComment1 from "./AddComment1";
import Button from "@material-ui/core/es/Button/Button";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ModeComment from "@material-ui/icons/es/ModeComment";
import Edit from "@material-ui/icons/es/Edit";
import Delete from "@material-ui/icons/es/Delete";
import ArrowDropDown from "@material-ui/core/es/internal/svg-icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/es/ArrowDropUp";
import Divider from "@material-ui/core/es/Divider/Divider";

class Comments1 extends Component {
    state = {
        isAddCommentClicked: false,
        postModalOpen: false,
        loading: true

    }

    componentDidMount() {
        console.log("MOUNTING COMPONENT:", "COMMENTS")

        this.props.getPostComments(this.props.postId).then(()=> this.setState({loading: false}))

    }

    componentDidUpdate(nextProps, prevState, snapshot) {
        // console.log("++prev state+++", prevState)
        // console.log("++comp state+++", this.state)
        // console.log("++NEXT PROPS id++", nextProps)

        console.log("NEXPROPS POSTS ID", nextProps.postId)
        console.log("THIS PROPS POST ID", this.props.postId)



        // if (prevState.isAddCommentClicked === true && this.state.isAddCommentClicked === false) {
        //     // this.setState({loading: true})
        //     // alert("now getting comments from modal block")
        //
        //
        //
        //     this.props.getPostComments(this.props.postId)
        //     this.setState({loading: false})
        //     // alert("DONE! now getting comments from modal block")
        //
        //
        // }
        if (nextProps.postId !== this.props.postId) {
            // // alert("now getting differ post id block")


            this.props.getPostComments(this.props.postId).then(()=> this.setState({loading: false}))




        }

    }
    openEditPostModal = () => this.setState(() => ({postModalOpen: true}))
    closeEditPostModal = () => this.setState(() => ({postModalOpen: false}))


    onDeleteClick = (id) => {


        this.props.deleteComment(id)
            .then(() => this.props.getPostComments(this.props.postId))
    }
    onAddCommentClick = (val) => {
        this.setState({isAddCommentClicked: val})
    }
    updateComment = (comment) => {
        const updatedComment = {
            id: comment.id,
            time_stamp: Date.now(), //update with edit time
            body: comment.body,

        }
        // console.log("updatePost data_________________", updatedComment)
        this.props.editComment(updatedComment.id, updatedComment)
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
                                        initialValue={c}
                                        onSub={this.updateComment}
                                        closeModal={this.closeEditPostModal}

                                    />}

                                </Modal>


                                {/*<div className={'comments-rating'}>*/}
                                    {/*<div className="fas fa-caret-up"*/}
                                         {/*onClick={() => this.props.voteComment(c.commentId, {option:'upVote',postId:c.postId})}>*/}

                                    {/*</div>*/}
                                    {/*<div onClick={() => this.props.voteComment(c.commentId, {option:'downVote',postId:c.postId})}>*/}
                                        {/*<i className="fas fa-caret-down"/>*/}
                                    {/*</div>*/}

                                {/*</div>*/}


                                    <Typography variant="body2" gutterBottom>
                                        {c.author}

                                    </Typography>






                                    <Typography>
                                        {c.body}

                                    </Typography>
                                <IconButton      className={'c-button'}
                                    onClick={() => this.props.voteComment(c.commentId, {option:'upVote',postId:c.postId})}>

                                    <ArrowDropUp/>
                                </IconButton>
                            <span className={'c-button'}>                                    {c.voteScore}
</span>
                                <IconButton      className={'c-button'}
                                    onClick={() => this.props.voteComment(c.commentId, {option:'downVote',postId:c.postId})}>
                                    <ArrowDropDown/>
                                </IconButton>
                                <IconButton      className={'c-button'}>
                                    <Delete/>
                                </IconButton>
                                <IconButton      className={'c-button'}>
                                    <Edit/>
                                </IconButton>

                                {/*<div className={'comments-footer'}>*/}
                                    {/*<div onClick={() => this.onDeleteClick(c.commentId)}>*/}
                                        {/*<i className="fas fa-trash-alt"/>*/}


                                    {/*</div>*/}
                                    {/*<div><i className="fas fa-edit" onClick={this.openEditPostModal}/>*/}

                                    {/*</div>*/}
                                {/*</div>*/}
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
                                        ? <AddComment1 postId={this.props.postId} commentClicked={this.onAddCommentClick}/>
                                        :
                                        <div>
                                            <Button  block
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

const mapStateToProps = (state, ownProps) => {
    console.log("Comments state: ", state)

    // console.log("Comments ownProps: ", ownProps)

    return {
        comments: state.comments
    }
}
const mapDispatchToProps = (dispatch) => ({
    getPostComments: (postId) => dispatch(getAllPostComments(postId)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    editComment: (id, data) => dispatch(editComment(id, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments1)


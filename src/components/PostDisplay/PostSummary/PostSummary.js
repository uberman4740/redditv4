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

import {API} from "aws-amplify";

class PostSummary extends Component {
    state = {
        isAddCommentClicked: false,
        postModalOpen: false,
        post: '',
        loadPost:false
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

    getPost() {
        return API.get("notes", `/posts/${this.props.match.params.postId }`);
    }

    // componentDidMount() {
    //     console.log("PostSummary CDM props: ", this.props)
    //
    // }
    async componentDidUpdate(nextProps, prevState, snapshot) {
        console.log("__________________________|||||||||||______________________________")
        console.log("CDU nextProps", nextProps)
        console.log("POST CDU props", this.props)
        if (this.props.match.params.postId !== nextProps.match.params.postId) {
            if(!this.props.match.params.postId ){
                this.setState({loadPost:false})


            }else {
                try {


                    const post = await this.getPost()
                    this.setState({post: post, loadPost: true})
                    console.log("booyakah!", this.state.post[0].title)

                    // console.log("bro the post is+++++", post)
                } catch (e) {
                    alert(e)
                }
            }

            // console.log("thre is an update man!!!!!!")
            // console.log("this.props.match.params.categoryId", this.props.match.params.categoryId)

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
        console.log("PostSummary Render  state: ", this.state)
        console.log("PostSummary params  state: ", this.props.match.params.postId)


        return (
            <div className={'post-summary-container'}>
                <PostSummarBar/>
                {!this.state.loadPost
                    ? null
                    : <div className={'post-inside'}>
                        <div className={'p-title'}>
                            <div className={'p-header'}>
                                {this.state.post[0].title}
                            </div>
                            <div className={'p-rating'}>


                                <div>
                                    <i className="fas fa-thumbs-up"
                                       onClick={() => this.props.votePost(this.state.post[0].id, 'upVote')}/>
                                </div>
                                <div>
                                    {this.state.post[0].voteScore}
                                </div>
                                <div>
                                    <i className="fas fa-thumbs-down"
                                       onClick={() => this.props.votePost(this.state.post[0].id, 'downVote')}/>
                                </div>
                            </div>
                            <div className={'p-footer'}>
                                <div><i className="far fa-comment"></i>

                                </div>
                                <div><i className="far fa-user"/>
                                    {this.state.post[0].author}
                                </div>
                                <div><i className="far fa-calendar-alt"/>
                                    {this.state.post[0].time_stamp}
                                </div>
                                <div>
                                    <i className="far fa-edit" onClick={this.openEditPostModal}/>
                                    <Modal
                                        isOpen={this.state.postModalOpen}
                                        onRequestClose={this.closeEditPostModal}

                                    >
                                        <EditPost
                                            onSubmitEditPost={this.onSubmitEditPost}

                                            post={this.state.post}/>

                                    </Modal>


                                </div>
                                <div onClick={() => this.onDeleteClick(this.state.post[0].id)}>
                                    <Link to={`/${this.state.post[0].category}`}>
                                        <i className="fas fa-trash-alt"/>

                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={'p-body'}>
                            <p>
                                {this.state.post[0].body}
                            </p>
                        </div>
                        <div className={'p-comments'}>
                            <div className={'p-comments-list'}>
                                <Comments postId={this.props.match.params.postId}
                                onAddComment={this.onAddComment}
                                />
                            </div>
                        </div>


                    </div>}

            </div>

        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log("PostSummary state: ", state)

    // console.log("PostSummary ownprops", ownProps)
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
    // getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data)),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),

})

export default connect(null, mapDispatchToProps)(PostSummary)

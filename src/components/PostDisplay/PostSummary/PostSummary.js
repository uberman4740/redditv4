import React, {Component} from 'react'
import './PostSummary.css';
import {PostSummarBar} from "../PostSummaryBar/PostSummarBar";
import Comments from "../../Comments/Comments";
import {deletePost, editPost, getPost, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import AddComment from "../../Comments/AddComment";
import {getAllPostComments} from "../../../actions/commentsActions";


class PostSummary extends Component {
    componentDidMount() {
        console.log("PostSummary CDM props: ", this.props)
    }
    // static getDerivedStateFromProps(props, state){
    //     console.log("GGGGGGGG props", props)
    //     console.log("GGGGGGGG this props", this.props)
    //     console.log("GGGGGGGG state", state)
    //
    //
    // }
    state = {
        isAddCommentClicked: false,
    }
    componentDidUpdate(nextProps){
        console.log("$$$post summary cdu props$$$", this.props)
        console.log("$$$post summary nextPropsu$$$", nextProps)

    }

    onAddCommentClick = (val) => {
        this.setState({isAddCommentClicked: val})
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        // this.setState(nextProps);
    }



    render() {
        console.log("PostSummary Render  props: ", this.props)

        return (
            <div className={'post-summary-container'}>
                <PostSummarBar/>

                <div className={'post-inside'}>
                    <div className={'p-title'}>
                        <div className={'p-header'}>
                            {this.props.post.title}
                        </div>
                        <div className={'p-rating'}>
                            <div>
                                <i className="fas fa-thumbs-up"></i>

                            </div>
                            <div>
                                {this.props.post.voteScore}
                            </div>
                            <div>
                                <i className="fas fa-thumbs-down"></i>

                            </div>
                        </div>
                        <div className={'p-footer'}>
                            <div><i className="far fa-comment"></i>

                            </div>
                            <div><i className="far fa-user"/>
                                {this.props.post.author}
                            </div>
                            <div><i className="far fa-calendar-alt"/>
                                {this.props.post.timestamp}

                            </div>

                        </div>

                    </div>

                    <div className={'p-body'}>
                        <p>
                            {this.props.post.body}
                        </p>
                    </div>
                    {/*<div className={'p-add-comment'} onClick={()=>this.onAddCommentClick()}>*/}
                        {/*Add comment*/}
                        {/*{*/}
                            {/*this.state.isAddCommentClicked*/}
                                {/*? <AddComment postId={this.props.post.id}/>*/}
                                {/*: null*/}
                        {/*}*/}

                    {/*</div>*/}
                    {/*<div className={'p-add-comment'} onClick={()=>this.onAddCommentClick(true)}>*/}
                        {/*Add comment*/}
                        {/*{*/}
                            {/*this.state.isAddCommentClicked*/}
                                {/*? <AddComment postId={this.props.post.id} commentClicked = {this.onAddCommentClick}/>*/}
                                {/*: null*/}
                        {/*}*/}

                    {/*</div>*/}

                    {/*<div className={'p-add-comment'} onClick={()=>this.onAddCommentClick()}>*/}

                                {/*<AddComment postId={this.props.post.id}/>*/}


                    {/*</div>*/}
                    <div className={'p-comments'}>
                        {/*<div className={'p-comments-header'}>Comments</div>*/}
                        <div className={'p-comments-list'}>
                            <Comments postId={this.props.match.params.postId}/>
                        </div>


                    {/*</div>*/}
                </div>


            </div>
            </div>

        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log("PostSummary state: ", state)

    console.log("PostSummary ownprops", ownProps)
    if (ownProps.match.params.postId === undefined){
        return {
            post: "",
            // post: state.posts,

            categories: state.categories
        }
    }
    else{
        return {

            post: state.posts[ownProps.match.params.postId],

            categories: state.categories
        }
    }

}

const mapDispatchToProps = (dispatch) => ({
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (id,option)=>dispatch(votePost(id,option)),
    editPost: (id,data)=>dispatch(editPost(id,data)),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),





})

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)

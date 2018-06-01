import React, {Component} from 'react'
import './PostSummary.css';
import {PostSummarBar} from "../PostSummaryBar/PostSummarBar";
import {Comments} from "../../Comments/Comments";
import {deletePost, editPost, getPost, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";


class PostSummary extends Component {
    componentDidMount() {
        console.log("PostSummary CDM props: ", this.props)
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
                    <div className={'p-comments'}>
                        <div className={'p-comments-header'}>Comments</div>
                        <div className={'p-comments-list'}>
                            <div>
                                <Comments/>
                            </div>
                            <div>
                                <Comments/>
                            </div>
                            <div>
                                <Comments/>
                            </div>



                        </div>


                    </div>
                </div>


            </div>

        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log("PostSummary state: ", state)

    console.log("PostSummary ownprops", ownProps)
    return {
        post: state.posts[ownProps.match.params.postId],
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPost: (postId) => dispatch(getPost(postId)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    votePost: (id,option)=>dispatch(votePost(id,option)),
    editPost: (id,data)=>dispatch(editPost(id,data))



})

export default connect(mapStateToProps, mapDispatchToProps)(PostSummary)

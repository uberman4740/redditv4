import React, {Component} from "react"
import './Post.css'
import {PostBar} from "../PostBar/PostBar";
import {PostSort} from "../PostSort/PostSort";
import {deletePost, editPost, getAllPosts, getCategoryPosts, votePost} from "../../../actions/postActions";
import connect from "react-redux/es/connect/connect";
import _ from 'lodash'
import {getAllPostComments} from "../../../actions/commentsActions";
import {SinglePost} from "../PostList/SinglePost";
import PostSummary from "../../PostDisplay/PostSummary/PostSummary";
import Link from "react-router-dom/es/Link";


class Post extends Component {
    state = {
        loading: true,
        toPostSummary: false,
        postModalOpen: false


    }
    openEditPostModal = () => this.setState(() => ({postModalOpen: true}))
    closeEditPostModal = () => this.setState(() => ({postModalOpen: false}))

    fetchCategoryPosts = (categoryId) => {
        // this.props.getCategoryPosts(categoryId).then(() => this.setState({loading: false}))
    }

    componentDidMount() {
        console.log("CCDDDDDDDDD", this.props)
        this.props.getAllPosts()
        // this.props.getCategoryPosts(this.props.match.params.categoryId)
        // console.log("SingleCategory CDM props: ", this.props)
        // console.log("SingleCategory catID: ", this.props.match.params.categoryId)


    }


    onDeleteClick = (id) => {
        // const {postId} = this.props.match.params
        console.log("clicked delete")

        // this.props.deletePost(id).then(() => this.props.getCategoryPosts(this.props.match.params.categoryId))

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
        console.log("CDU nextProps", nextProps)
        console.log("CDU props", this.props)
        if (this.props.match.params.categoryId !== nextProps.match.params.categoryId) {
            this.props.getCategoryPosts(this.props.match.params.categoryId)

        }

    }

    onToPostSummary = () => {
        this.setState({toPostSummary: true})
    }

    render() {


        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        console.log("Post render props:");
        console.log("this.props");
        const divStyle = {
            backgroundColor: '#b65b1d', // note the capital 'W' here
            // msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

        return (
            <div className={'post-container'}>
                <div>
                    <PostBar/>
                    <PostSort/>
                    <div className={'post-yo'}>
                        {
                            _.map(this.props.posts, p =>
                                (
                                    <div className={"hh"}>

                                        {/*{<PostSummary showPost={this.state.toPostSummary}/>}*/}


                                        <div className={'post-list'}>
                                            <div className={'rating'}>
                                                <div>
                                                    <i className="fas fa-thumbs-up"
                                                       onClick={() => this.props.votePost(p.id, 'upVote')}/>
                                                </div>
                                                <div>
                                                    {p.voteScore}                                                </div>
                                                <div>
                                                    <i className="fas fa-thumbs-down"
                                                       onClick={() => this.props.votePost(p.id, 'downVote')}/>
                                                </div>
                                            </div>
                                            <div className={'post'}>
                                                <Link to={`/${p.category}/${p.id}`}>{p.title}</Link>
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
                        {/*{*/}
                        {/*color.map(i=>(*/}
                        {/*<div className={"hh"} style={{backgroundColor:i}}>*/}
                        {/*<div className={'post-list'}>*/}
                        {/*<div className={'rating'}>*/}
                        {/*<div>*/}
                        {/*<i className="fas fa-thumbs-up"></i>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*12*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*<i className="fas fa-thumbs-down"></i>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className={'post'}>*/}
                        {/*React is awesome. I can now make machine learning Web Apps! Woo hoo!*/}
                        {/*</div>*/}
                        {/*<div className={'post-footer'}>*/}
                        {/*<div className={'post-footer comments'}><i className="far fa-comment"></i>*/}
                        {/*</div>*/}
                        {/*<div className={'post-footer author'}><i className="far fa-user"></i>*/}

                        {/*</div>*/}
                        {/*<div className={'post-footer date'}><i className="far fa-calendar-alt"></i>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*))}*/}

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // const posts = _.filter(state.posts,p=> !p.deleted)
    console.log("SingleCategory state: ", state)


    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllPosts: () => dispatch(getAllPosts()),
    // getPostComments: (postId) => dispatch(getAllPostComments(postId)),


    getCategoryPosts: (categoryId) => dispatch(getCategoryPosts(categoryId)),
    deletePost: (postId) => dispatch(deletePost(postId)),

    votePost: (id, option) => dispatch(votePost(id, option)),
    editPost: (id, data) => dispatch(editPost(id, data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Post)

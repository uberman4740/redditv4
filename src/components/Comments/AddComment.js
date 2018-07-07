import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {createComment, getAllPostComments} from "../../actions/commentsActions";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";
import TextField from "@material-ui/core/es/TextField/TextField";

class AddComment extends Component {
    state = {
        body:'',
        author:this.props.authUser,
        postId: this.props.postId
    }
    componentDidMount=()=> {
        // // console.log("AddComment CDM props: ", this.props)
    }


    handleInputChange= (event)=> {
        const target = event.target

        const value = target.value
        const name = target.name
        this.setState({[name]:value});
    }
    // handleSubmit =()=> {
    //
    //     this.props.createComment(this.state).then(()=>this.props.getPostComments(this.state.parentId)
    //     )
    //
    //     this.props.commentClicked(false)
    // }
    handleSubmit =()=> {

        this.props.createComment(this.state)


        this.props.commentClicked(false)
    }

    render() {
        // // console.log("AddComment Render  props: ", this.props)

        return (
            <form onSubmit={this.handleSubmit}>


                <div className={'ui form'}>
                    <div >

                        {/*<label>Text</label>*/}
                        <textarea name={'body'}
                                  placeholder="Enter Comment"
                                  value={this.state.body}
                                  onChange={this.handleInputChange}
                                  className={'comment-add-text'}

                        />
                    </div>
                    {/*<div className="ui field">*/}
                        {/*/!*<label>Author</label>*!/*/}
                        {/*<input type="text" name="author" placeholder="Author Name"*/}
                               {/*value={this.state.author}*/}
                               {/*onChange={this.handleInputChange}*/}
                        {/*/>*/}
                    {/*</div>*/}

                    <button className="ui button" type="submit">Submit</button>
                    <button className="ui button" type="submit" onClick={()=>this.props.commentClicked(false)}>Cancel</button>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // alert(state.authUser)

    return {authUser: state.authUser}
}
const mapDispatchToProps = (dispatch) => ({
    createComment: (commentData) => dispatch(createComment(commentData)),
    getPostComments: (postId) => dispatch(getAllPostComments(postId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)

import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {createComment, getAllPostComments} from "../../actions/commentsActions";


class AddComment extends Component {
    state = {
        body:'',
        author:this.props.authUser,
        postId: this.props.postId
    }

    handleInputChange= (event)=> {
        const target = event.target

        const value = target.value
        const name = target.name
        this.setState({[name]:value});
    }

    handleSubmit =()=> {

        this.props.createComment(this.state)


        this.props.commentClicked(false)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>


                <div className={'ui form'}>
                    <div >
                        <textarea name={'body'}
                                  placeholder="Enter Comment"
                                  value={this.state.body}
                                  onChange={this.handleInputChange}
                                  className={'comment-add-text'}

                        />
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                    <button className="ui button" type="submit" onClick={()=>this.props.commentClicked(false)}>Cancel</button>
                </div>
            </form>

        )
    }
}

const mapStateToProps = (state) => {

    return {authUser: state.authUser}
}
const mapDispatchToProps = (dispatch) => ({
    createComment: (commentData) => dispatch(createComment(commentData)),
    getPostComments: (postId) => dispatch(getAllPostComments(postId)),

})

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)

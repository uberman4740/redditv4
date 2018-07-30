
import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {createComment, getAllPostComments} from "../../actions/commentsActions";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
class AddComment extends Component {
    state = {
        body: '',
        author: this.props.authUser,
        postId: this.props.postId,
        userId:this.props.userId

    }



    handleInputChange = (event) => {

        const target = event.target

        const value = target.value
        const name = target.name
        this.setState({[name]: value});
    }

    handleSubmit = () => {
        console.table(this.state)

        this.props.createComment(this.state)


        this.props.commentClicked(false)
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>




                <div className={'ui form'}>
                    <div>

                        <TextField name={'body'}
                                  placeholder="Enter Comment"
                                  value={this.state.body}
                                  onChange={this.handleInputChange}
                                   label="Comment as raju"
                                   margin="normal"
                                   multiline="true"
                                   rows="4"
                                   autoFocus={"false"}
                                   fullWidth={true}

                        />
                    </div>
                    <Button    block
                               bsSize="small"
                               color="primary"
                               variant="contained" type="submit">Submit</Button>

                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <Divider/>



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

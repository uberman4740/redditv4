import React, {Component} from 'react'



export class CommentEdit extends Component {
    state = {
        commentId:this.props.initialValue.commentId,
        body:this.props.initialValue.body
    }

    onFormSubmit = () => {
        this.props.onSub(this.state)
    }
    handleChange = (event) => {

        this.setState({
            body: event.target.value
        })
    }


    render() {
        console.log("commend edit", this.state)



        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        ref='name'
                        value={this.state.body}
                        onChange={this.handleChange}/>


                    <div>
                        <button type="submit" >
                            Submit
                        </button>
                        <button type="submit" onClick={this.props.closeModal}>
                            Cancel
                        </button>


                    </div>
                </form>
            </div>
        )
    }
}



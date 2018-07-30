import React, {Component} from 'react'


export class EditPost extends Component {
    state={
        postId:this.props.post.postId,
        title:this.props.post.title,
        body:this.props.post.body,
        category:this.props.post.category,
        author: this.props.post.author,
        time_stamp: this.props.post.time_stamp,
        userId: this.props.post.userId

    }
    componentDidMount=()=>{
        console.log("in edit post cdu,", this.state)
    }
    handleSubmit=()=>{
        console.table(this.state)
        this.props.onSubmitEditPost(this.state)

    }
    handleChange=(event)=>{
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({[name]:value});
        console.log(this.state)
    }


    render() {
        console.log("EditPost Render  props: ", this.props)

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input
                        name={'title'}
                        type={'text'}
                        placeholder="Enter Title"

                        value={this.state.title}
                        onChange={this.handleChange}/>
                </label>
                <label>

                    <textarea
                        name={'body'}
                        type={'text'}
                        value={this.state.body}
                        onChange={this.handleChange}/>
                </label>
                <label>
                    <input
                        name={'category'}
                        type={'text'}

                        value={this.state.category}
                        onChange={this.handleChange}/>
                </label>

                <button type={'submit'}>Submit</button>
                <button type={'submit'}>Cancel</button>
            </form>
        )
    }
}



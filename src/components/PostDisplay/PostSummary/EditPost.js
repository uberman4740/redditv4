import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {editPost} from "../../../actions/postActions";
import withRouter from "react-router-dom/es/withRouter";


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

       // this.setState({timestamp:Date.now()});

        // this.props.editPost(this.state.id,this.state);
       // this.props.history.push('/redux')

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
                        // placeholder="Enter Body"
                        name={'body'}
                        type={'text'}
                        value={this.state.body}
                        onChange={this.handleChange}/>
                </label>
                <label>
                    <input
                        name={'category'}
                        type={'text'}
                        // placeholder="Enter Category"

                        value={this.state.category}
                        onChange={this.handleChange}/>
                </label>

                <button type={'submit'}>Submit</button>
                <button type={'submit'}>Cancel</button>
            </form>
        )
    }
}



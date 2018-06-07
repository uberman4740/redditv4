import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {createPost} from "../../../actions/postActions";
import {getAllCategories} from "../../../actions/categoryActions";
const uuidv4 = require('uuid/v4');


export class AddPost extends Component{
    state={
        id: uuidv4(),
        title:'',
        body:'',
        author:'',
        category:'',
    }

    handleSubmit=()=>{
        this.props.onSubmitNewPost(this.state)
    }
    handleChange=(event)=>{
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({[name]:value});
    }
    render(){
        // console.log("ADDD POST!!@!#@!#@!#!@#!@#",this.props)
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input
                        name={'title'}
                        type={'text'}
                        placeholder="Enter Title"

                        value={this.state.value}
                        onChange={this.handleChange}/>
                </label>
                <label>

                    <textarea
                        placeholder="Enter Body"
                        name={'body'}
                        type={'text'}
                        value={this.state.value}
                        onChange={this.handleChange}/>
                </label>
                <label>
                    <input
                        name={'category'}
                        type={'text'}
                        placeholder="Enter Category"

                        value={this.state.value}
                        onChange={this.handleChange}/>
                </label>
                <label>
=                    <input
                        name={'author'}
                        type={'text'}
                    placeholder="Enter Author"


                    value={this.state.value}
                        onChange={this.handleChange}/>
                </label>
                <button type={'submit'}>Submit</button>
                <button type={'submit'}>Cancel</button>
            </form>
            )
    }
}



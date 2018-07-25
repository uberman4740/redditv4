import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import Redirect from "react-router-dom/es/Redirect";


export class CommentEdit extends Component {
    state = {
        commentId:this.props.initialValue.commentId,
        body:this.props.initialValue.body
    }

    componentDidMount() {
        console.log("CommentEdit CDM props: ", this.props)
    }

    onFormSubmit = () => {
        // event.preventDefault()
        this.props.onSub(this.state)
        // console.log("submit!!!!!" ,this.state.value)
    }
    handleChange = (event) => {

        this.setState({
            body: event.target.value
        })
    }


    render() {
        console.log("commend edit", this.state)
        // console.log("CommentEdit Render  props: ", this.props)
        // console.log("CommentEdit Render  state: ", this.state)
        // console.log(this.state.value.body)

        // console.log("someproprrrr", someProperty)
        // let someProperty = {...this.state.value}
        // console.log("sommmme proper",someProperty)
        // someProperty.body = event.target.value


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



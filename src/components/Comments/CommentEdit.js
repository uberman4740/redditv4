import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import Redirect from "react-router-dom/es/Redirect";


export class CommentEdit extends Component {
    state = {
        value: this.props.initialValue
    }

    componentDidMount() {
        console.log("CommentEdit CDM props: ", this.props)
    }

    onFormSubmit = () => {
        // event.preventDefault()
        this.props.onSub(this.state.value)
        // console.log("submit!!!!!" ,this.state.value)
    }
    handleChange = (event) => {
        var someProperty = {...this.state.value}
        someProperty.body = event.target.value

        this.setState({
            value: someProperty
        })
    }


    render() {
        // console.log("CommentEdit Render  props: ", this.props)
        // console.log("CommentEdit Render  state: ", this.state)
        // console.log(this.state.value.body)

        // console.log("someproprrrr", someProperty)
        let someProperty = {...this.state.value}
        // console.log("sommmme proper",someProperty)
        // someProperty.body = event.target.value


        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        ref='name'
                        value={someProperty.body}
                        onChange={this.handleChange}/>


                    <div>
                        <button type="submit" className={'ui primary button'}>
                            Submit
                        </button>
                        <button type="button" className={'ui red button'} onClick={this.props.closeModal}>
                            Cancel
                        </button>


                    </div>
                </form>
            </div>
        )
    }
}



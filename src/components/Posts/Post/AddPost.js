import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";


class AddPost extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: '',
    }

    componentDidMount() {
        console.log("SDFASEFQ#$F#$", this.props)
        this.setState({author: this.props.authUser})
    }

    handleSubmit = () => {
        this.props.onSubmitNewPost(this.state)
    }
    handleChange = (event) => {
        console.log("EVENT" ,event)
        const target = event.target
        console.log("TARGER" ,target)

        const value = target.value
        console.log("VALUE" ,value)

        const name = target.name
        this.setState({[name]: value});
    }

    render() {
        console.log("ADDD POST!!@!#@!#@!#!@#!@#", this.state)
        return (
            <Card>

                <CardContent>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <TextField
                                name={'title'}
                                type={'text'}
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                autoComplete="current-password"
                                margin="normal"
                            />

                        </label>
                        <label>
                            <TextField
                                label="Text"
                                margin="normal"
                                multiline="true"
                                rows="4"
                                autoFocus={"false"}
                                fullWidth={true}
                                name={'body'}
                                type={'text'}
                                value={this.state.body}
                                onChange={this.handleChange}

                            />


                        </label>
                        <label>
                            <TextField
                                name={'category'}
                                select
                                placeholder="Enter Category"

                                value={this.state.category}
                                onChange={this.handleChange}

                                helperText="Please select category"
                                margin="normal"
                            >
                                {this.props.categories.map(option => {
                                    if (option !== 'all') {
                                        return (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )

                                    }


                                })}
                            </TextField>
                        </label>



                        {/*<TextField*/}
                        {/*id="select-currency"*/}
                        {/*select*/}
                        {/*label="Select"*/}
                        {/*value={this.state.category}*/}
                        {/*onChange={this.handleChange}*/}

                        {/*helperText="Please select your currency"*/}
                        {/*margin="normal"*/}
                        {/*>*/}
                        {/*{this.props.categories.map(option => (*/}
                        {/*<MenuItem key={option} value={option}>*/}
                        {/*{option}*/}
                        {/*</MenuItem>*/}
                        {/*))}*/}
                        {/*</TextField>*/}
                        {/*<input*/}
                        {/*name={'category'}*/}
                        {/*type={'text'}*/}
                        {/*placeholder="Enter Category"*/}

                        {/*value={this.state.value}*/}
                        {/*onChange={this.handleChange}/>*/}
                        {/*<label>*/}
                        {/*<input*/}
                        {/*name={'author'}*/}
                        {/*type={'text'}*/}
                        {/*placeholder="Enter Author"*/}


                        {/*value={this.state.value}*/}
                        {/*onChange={this.handleChange}/>*/}
                        {/*</label>*/}
                        <div>
                            <Button style={{margin:'50px'}} type={'submit'} variant="contained" color="primary">
                                SUBMIT
                            </Button>


                            <Button type={'submit'} variant="contained" color="primary">
                                CANCEL
                            </Button>
                        </div>

                    </form>
                </CardContent>

            </Card>

        )
    }
}

const mapStateToProps = (state) => {
    // console.log("Post state: ", Object.keys(state.categories))


    return {
        posts: state.posts,
        authUser: state.authUser,
        categories: Object.keys(state.categories)
    }
}


export default connect(mapStateToProps, null)(AddPost)

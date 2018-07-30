import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import {Auth} from "aws-amplify";


import './Verification.css'

export class Verification extends Component {
    state = {
        isLoading: false,
        email: "",
        userName:'',
        phone_number:'',

        confirmationCode:''

    }
    componentDidMount() {
        console.log("Verification CDM props: ", this.props)
        this.setState({email:this.props.location.state.email})
        this.setState({userName:this.props.location.state.userName})
        // this.setState({userName:this.props.location.state.phone_number})

    }
    handleChange=event=>{
        this.setState({
            [event.target.id]:event.target.value
        })
    }


    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(this.state.userName, this.state.confirmationCode);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    render() {
        console.log("Verification Render  props: ", this.state)

        return (
            <div className={'card-container'}>
                <Card className={'card-content-container'}>
                    <CardContent className={'card-inside'}>
                        <div className={'logo'}></div>
                        <div className={'title'}><Typography variant="headline">Verify your email address</Typography>
                        </div>
                        <div className={'subtitle'}><Typography variant="subheading">
                            <p>
                                Enter the verification code we sent to {this.state.email}.
                                <br/>If you don’t see it, check your spam folder.
                            </p>

                        </Typography>
                        </div>
                        <form>
                            <div className={'email'}>
                                <TextField
                                    id="confirmationCode"
                                    label="Enter code"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.confirmationCode}
                                    onChange={this.handleChange}

                                /></div>

                            <div className={'action-row'}>

                                <div>
                                    <Link to="/signup" style={{textDecoration: 'none'}}>
                                        <Button color="primary">
                                            BACK
                                        </Button>

                                    </Link>
                                </div>

                                <div>
                                    <Button type ="submit" variant="contained" color="primary" onClick={this.handleConfirmationSubmit}>
                                        VERIFY
                                    </Button>
                                </div>
                            </div>
                        </form>



                    </CardContent>

                </Card>


            </div>

        )
    }
}


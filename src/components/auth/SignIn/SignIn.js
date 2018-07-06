import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Auth, API} from "aws-amplify";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';


import './SignIn.css'
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {addAuthUser} from "../../../actions/authAction";

class SignIn extends Component {
    state = {
        email: "",
        password: "",
        isAuthenticated: false,
        isLoading: false,
        token: ''


    };
    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);

    }
    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        console.log("in handsubmit")
        this.setState({isLoading: true});
        event.preventDefault();
        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.setState({isAuthenticated: true})
            this.setState({isLoading: false})
            const session = await Auth.currentSession()
            console.log(session)
            this.props.addAuthUser(session.idToken.payload['cognito:username'])
        }
        catch (e) {
            alert(e.message);
            console.log("not logged in")
            this.setState({isLoading: false})
        }


        // this.setState({token: session.idToken.jwtToken})
        this.props.history.push({pathname: '/all'})

    }
    userHasAuthenticated =  authenticated => {

        this.setState({isAuthenticated: authenticated});


    }

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }


        this.setState({ isAuthenticating: false });
    }


    render() {
        console.log("Title Render  props: ", this.state.email)

        return (
            <div className={'card-container'}>
                <Card className={'card-content-container'}>
                    <CardContent className={'card-inside'}>
                        <div className={'logo'}></div>
                        <div className={'title'}><Typography variant="headline">Sign in</Typography></div>
                        <div className={'subtitle'}><Typography variant="subheading">
                            <p>
                                to continue to ReadIt
                            </p>
                        </Typography>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={'email'}>
                                <TextField
                                    id="email"
                                    label="Email or phone"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    fullWidth
                                    name={'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className={'action-row'}>

                                <div>
                                    <Button color="primary">
                                        <Link to="/signup" style={{textDecoration: 'none'}}>Create account</Link>

                                    </Button>
                                </div>

                                <div>
                                    <Button
                                        disabled={!this.validateForm()}
                                        type="submit"
                                        variant="contained" color="primary"
                                    >
                                        SIGN IN
                                    </Button>
                                </div>

                            </div>
                        </form>


                    </CardContent>
                    {!this.state.isAuthenticated ? null :
                        <div>
                            <Card>
                                <CardContent>
                                    <Button
                                        onClick={this.handleLogout}

                                        color="primary">
                                        LOGOUT
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    }
                    {this.state.isLoading ? <LinearProgress/> : null
                    }

                </Card>


            </div>
        )
    }
}



const mapStateToProps = (state) => {
    console.log("auth compnent state: ", state)


    return {
        authUser: state.authUser
    }
}

const mapDispatchToProps = (dispatch) => ({

    addAuthUser: (authUser) => dispatch(addAuthUser(authUser)),

})


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
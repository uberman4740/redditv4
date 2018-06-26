import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import './SignUp.css'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {Auth} from "aws-amplify";
import {Link} from "react-router-dom";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'


const styles = theme => ({
    card: {
        minWidth: 275,
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    pos: {
        marginBottom: 12,
    },
});

class SignUp extends Component {
    state = {
        isLoading: false,
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        phone_number:'',

        newUser: null
    }

    componentDidMount() {
        console.log("SignUp CDM props: ", this.props)
    }

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.confirmPassword !== this.state.password) {
            alert("Passwords do not match!")
            return
        }
        this.setState({isLoading: true});
        try {
            const newUser = await Auth.signUp({
                username: this.state.userName,
                password: this.state.password,
                attributes: {
                    email: this.state.email,
                    phone_number:this.state.phone_number

                }
            });
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }
        this.setState({isLoading: false});
        this.props.history.push({pathname: '/verification', state: {email: this.state.email, userName:this.state.userName,phone_number:this.state.phone_number}})
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    validateForm = () => {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    render() {
        console.log("SignUp state  props: ", this.state)

        return (
            <div className={'card-container'}>
                <Card className={'card-content-container'}>
                    <CardContent className={'card-inside'}>
                        <div className={'logo'}></div>
                        <div className={'title'}><Typography variant="headline">Create you ReadIt!
                            Account</Typography></div>
                        <div className={'subtitle'}><Typography variant="subheading">to continue</Typography>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={'email'}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    fullWidth/>
                            </div>
                            <div className={'user-name'}>
                                <TextField
                                    id="userName"
                                    label="Username"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.userName}
                                    onChange={this.handleChange}
                                    fullWidth/>
                            </div>
                            <div className={'phone'}>

                                <PhoneInput
                                    id = 'phone_number'
                                    country="US"
                                    placeholder="Start typing a phone number"
                                    value={ this.state.phone_number }
                                    onChange={ value => this.setState({phone_number:value}) }/>

                            </div>
                            <div className={'password-row'}>
                                <div>
                                    <TextField

                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        id="confirmPassword"
                                        label="Confirm password"
                                        type="password"
                                        autoComplete="current-password"
                                        margin="normal"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </div>


                            </div>
                            <div className={'action-row'}>

                                <div>

                                    <Link exact to="/" style={{textDecoration: 'none'}}>
                                        <Button color="primary">
                                            Sign in instead
                                        </Button>

                                    </Link>
                                </div>

                                <div>


                                    <Button type='submit' variant="contained" color="primary">
                                        NEXT
                                    </Button>


                                </div>
                            </div>
                        </form>


                    </CardContent>
                    {this.state.isLoading ? <LinearProgress/> : null
                    }

                </Card>


            </div>

        )
    }
}


//
// <h1>Login here</h1>
//
// <form className="login" action="" method="post">
//
//     <div><label className="username">Username</label>
// <input type="text" name="username" id="username"/>
// </div>
// <div><label className="password">Password</label>
//     <input type="password" name="password" id="password"/>
// </div>
//
// <div className="actions">
//     <input type="submit" name="login" value="Login"/>
//     <a href="/forgot">I forgot my password</a>
// </div>
// </form>
//
// <div className="account">
//     <p>Create a new account <a href="">here</a>.</p>
// </div>
//
// <div className="contact">
//     <p>If you need any other help, please contact the helpdesk.</p>
//     </div>
//     <Button variant="contained" color="primary">
//         Sign up
//     </Button>
export default withStyles(styles)(SignUp);

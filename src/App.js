import React, {Component} from 'react';
import './App.css'
import Category from "./components/Category/Category";
import Post from "./components/Posts/Post/Post";
import PostSummary1 from "./components/PostDisplay/PostSummary/PostSummar1";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import SignIn from "./components/auth/SignIn/SignIn";
import {Auth, API} from "aws-amplify";
import connect from "react-redux/es/connect/connect";
import {addAuthUser} from "./actions/authAction";
import SignUp from "./components/auth/SignUp/SignUp";
import {Verification} from "./components/auth/Verification/Verification";


class App extends Component {
    async componentDidMount() {
        const session = await Auth.currentSession()
        console.log(session)
        this.props.addAuthUser(session.idToken.payload['cognito:username'])
    }

    render() {
        console.log("AUTH USSSSSER RENDER",this.props.authUser)

        return (


            <Router>


                <div>
                    {
                        (Object.keys(this.props.authUser).length === 0) ?
                            <div className={'backg'}>
                                <Route exact path='/' component={SignIn}/>
                                <Route exact path='/signin' component={SignIn}/>

                                <Route exact path='/signup' component={SignUp}/>
                                <Route exact path="/verification" component={Verification}/>
                            </div>
                            :     <Switch>
                                <Route path='/:categoryId?/:postId?' render={(props) =>
                                    <div className={"app-container"}>
                                        <Category {...props}/>
                                        <Post {...props}/>
                                        <PostSummary1 {...props}/>
                                    </div>}/>
                            </Switch>
                    }


                </div>

            </Router>


        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("AUTH USER IN THE HOUSE,", state)

    // console.log("ownPPP", ownProps)
    return {
        authUser: state.authUser,

        categories: state.categories,

    }


}
const mapDispatchToProps = (dispatch) => ({
    addAuthUser: (authUser) => dispatch(addAuthUser(authUser)),

})


export default connect(mapStateToProps, mapDispatchToProps)(App)

import React, {Component} from 'react';
import './App.css'
import Category from "./components/Category/Category";
import Post from "./components/Posts/Post/Post";
import PostSummary from "./components/PostDisplay/PostSummary/PostSummary";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// import {CategoriesBar} from "./components/Categories/CategoriesBar/CategoriesBar";
// import {PostSummary} from "./components/PostDisplay/PostSummary/PostSummary";
// import {Category} from "./components/Category/Category";

class App extends Component {
    render() {
        return (

                <Router >
                    <div>
                        <Route exact path ='/:categoryId?/:postId?' render={(props)=>
                            <div className={"app-container"}>
                                <Category {...props}/>
                                <Post {...props}/>
                                <PostSummary {...props}/>
                            </div>}/>
                    </div>
                </Router>


        );
    }
}

export default App;

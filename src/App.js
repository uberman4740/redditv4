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

                <Router  >
                    <div className={"app-container"}>
                        <Category/>
                        <Post/>



                        <Route path ='/:postId' exact component={PostSummary}/>
                    </div>

                </Router>


        );
    }
}

export default App;

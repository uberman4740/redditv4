import React, {Component} from 'react';
import './App.css'
import Category from "./components/Category/Category";
import Post from "./components/Posts/Post/Post";
// import {CategoriesBar} from "./components/Categories/CategoriesBar/CategoriesBar";
// import {PostSummary} from "./components/PostDisplay/PostSummary/PostSummary";
// import {Category} from "./components/Category/Category";

class App extends Component {
    render() {
        return (
            <div className={"app-container"} >
                <Category/>

                <Post/>
                {/*<PostSummary/>*/}


            </div>
        );
    }
}

export default App;

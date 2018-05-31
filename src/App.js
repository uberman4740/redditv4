import React, {Component} from 'react';
import './App.css'
import {Post} from "./components/Posts/Post/Post";
import {CategoriesBar} from "./components/Categories/CategoriesBar/CategoriesBar";
import {Category} from "./components/Categories/Category/Category";
import {PostSummary} from "./components/PostDisplay/PostSummary/PostSummary";

class App extends Component {
    render() {
        return (
            <div className={"app-container"} >
                <Category/>

                <Post/>
                <PostSummary/>


            </div>
        );
    }
}

export default App;

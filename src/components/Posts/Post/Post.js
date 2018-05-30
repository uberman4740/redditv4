import React, {Component} from "react"
import './Post.css'
import {PostBar} from "../PostBar/PostBar";
import {PostSort} from "../PostSort/PostSort";
import {SinglePost} from "../PostList/SinglePost";

export class Post extends Component {
    componentDidMount() {
        console.log("Post CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }


    render() {

        const color = ['#d90015','#dc1c17','#e03917','#e25819','#e4751b'];
        console.log("Post render props:");
        console.log("this.props");
        const divStyle = {
            backgroundColor: '#b65b1d', // note the capital 'W' here
            // msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

        return (
            <div className={'vpp'}>
                <div className={'post-container'}>

                    <div>
                        <PostBar/>
                        <PostSort/>
                    </div>
                    <div className={'post-yo'}>
                        {
                            color.map(i=>(
                            <div className={"hh"} style={{backgroundColor:i}}>
                                <SinglePost/>
                            </div>

                        ))}


                    </div>


                </div>


                {/*<div className={'post-yo'}>*/}
                    {/*<SinglePost/>*/}
                {/*</div>*/}








            </div>












        );
    }
}

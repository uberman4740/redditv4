import React, {Component} from "react"
import './PostBar.css'
export class PostBar extends Component {
    componentDidMount() {
        console.log("PostBar CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("PostBar render props:");
        console.log("this.props");

        return (
            <div className={'post-bar'}>
                <div className={"post-bar-header"}>
                    <h1>Posts</h1></div>
                <div className={"search-posts"}><i className="fas fa-search"></i>

                </div>
                <div className={'add-post'}><i className="fas fa-plus"></i>

                </div>
            </div>
        );
    }
}

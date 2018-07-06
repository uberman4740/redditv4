import React, {Component} from "react"
import './PostBar.css'
import Button from "@material-ui/core/es/Button/Button";
import AddIcon from '@material-ui/icons/Add';

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
                <div className={'add-post'}>
                    <Button variant="fab" color="primary" aria-label="add" >
                    <AddIcon />
                </Button>

                </div>

            </div>
        );
    }
}

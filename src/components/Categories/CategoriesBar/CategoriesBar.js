import React, {Component} from "react"
import './CategoriesBar.css'
export class CategoriesBar extends Component {
    componentDidMount() {
        console.log("CategoriesBar CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("CategoriesBar render props:");
        console.log("this.props");

        return (
            <div className={'category-bar'}>
                <div className={"category-bar-header"}>
                    <h1>Categories</h1></div>
                <div className={"search-category"}><i className="fas fa-search"></i>

                </div>
                <div className={'add-category'}><i className="fas fa-plus"></i>

                </div>
            </div>
        );
    }
}

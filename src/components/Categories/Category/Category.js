import React, {Component} from "react"
import './Category.css'
import {CategoriesBar} from "../CategoriesBar/CategoriesBar";
import {CategorySort} from "../CategorySort/CategorySort";
import {SingleCategory} from "../SingleCategory/SingleCategory";

export class Category extends Component {
    componentDidMount() {
        console.log("Category CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        console.log("Category render props:");
        console.log("this.props");

        return (
                <div className={'category-container'}>
                    <div>
                        <CategoriesBar/>
                        <CategorySort/>
                        <SingleCategory/>

                    </div>








                    </div>












        );
    }
}

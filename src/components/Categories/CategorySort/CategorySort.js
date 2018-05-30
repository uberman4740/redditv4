import React, {Component} from "react"
import './CategorySort.css'
export class CategorySort extends Component {
    componentDidMount() {
        console.log("CategorySort CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("CategorySort render props:");
        console.log("this.props");

        return (
            <div className={'category-sort'}>


                <div className={'sort'}>
                    <div className={'category-sort-header'}>title</div>
                    <div className={'category-up'}>
                        <i className="fas fa-arrow-alt-circle-up"></i>


                    </div>
                    <div className={'category-down'}><i className="fas fa-arrow-alt-circle-down"></i>


                    </div>
                </div>

            </div>
        );
    }
}

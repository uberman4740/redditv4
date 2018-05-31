import React, {Component} from "react"
import './SingleCategory.css';
export class SingleCategory extends Component {
    componentDidMount() {
        console.log("SingleCategory CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("SingleCategory render props:");
        console.log("this.props");

        return (
            <div>
                <div className={'category-list'}>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>
                    <div className={'category'}>Engineering</div>

                    <div className={'category'}>Engineering</div>












                </div>
            </div>
        );
    }
}

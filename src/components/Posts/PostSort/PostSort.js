import React, {Component} from "react"
import './PostSort.css'

export class PostSort extends Component {
    componentDidMount() {
        console.log("PostSort CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("PostSort render props:");
        console.log("this.props");

        return (

            <div className={'post-sort'}>
                <div className={'sort'}>
                    <div className={'sort-header'}>rating</div>
                    <div className={'up'}><i className="fas fa-arrow-alt-circle-up"></i>


                    </div>
                    <div className={'down'}><i className="fas fa-arrow-alt-circle-down"></i>


                    </div>
                </div>

                <div className={'sort'}>
                    <div className={'sort-header'}>date</div>
                    <div className={'up'}>
                        <i className="fas fa-arrow-alt-circle-up"></i>


                    </div>
                    <div className={'down'}><i className="fas fa-arrow-alt-circle-down"></i>


                    </div>
                </div>

                <div className={'sort'}>
                    <div className={'sort-header'}>title</div>
                    <div className={'up'}>
                        <i className="fas fa-arrow-alt-circle-up"></i>


                    </div>
                    <div className={'down'}><i className="fas fa-arrow-alt-circle-down"></i>


                    </div>
                </div>

            </div>
        );
    }
}

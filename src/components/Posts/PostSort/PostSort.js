import React, {Component} from "react"
import './PostSort.css'

export class PostSort extends Component {
    componentDidMount() {
        // console.log("PostSort CDU props:");
        // console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        // console.log("PostSort render props:");
        // console.log("this.props");

        return (

            <div className={'post-sort'}>
                <div className={'c-sort'}>
                    <div className={'dropdown'}>
                        sortBy
                        <div className="dropdown-content">

                            <div onClick={() => this.props.sortBy('title', 'asc')}>title:low to high</div>
                            <div onClick={() => this.props.sortBy('title', 'desc')}>title:high to low</div>

                            <div onClick={() => this.props.sortBy('rating', 'asc')}>rating:low to high</div>
                            <div onClick={() => this.props.sortBy('rating', 'desc')}>rating:high to low</div>

                            <div onClick={() => this.props.sortBy('date', 'asc')}>date:latest to oldest</div>
                            <div onClick={() => this.props.sortBy('date', 'desc')}>date:oldest to latest</div>


                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

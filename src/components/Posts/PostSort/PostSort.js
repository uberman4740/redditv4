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
                <div className={'c-sort'}>
                    <div className={'dropdown'}>
                        sortBy
                        <div class="dropdown-content">

                            <div onClick={() => this.props.sortBy('title', 'asc')}>title:low to high</div>
                            <div onClick={() => this.props.sortBy('title', 'desc')}>title:high to low</div>

                            <div onClick={() => this.props.sortBy('rating', 'asc')}>rating:low to high</div>
                            <div onClick={() => this.props.sortBy('rating', 'desc')}>rating:low to high</div>

                            <div onClick={() => this.props.sortBy('date', 'asc')}>date:low to high</div>
                            <div onClick={() => this.props.sortBy('date', 'desc')}>date:high to low</div>


                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

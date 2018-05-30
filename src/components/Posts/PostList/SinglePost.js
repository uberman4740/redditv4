import React, {Component} from "react"
import './SinglePost.css'

export class SinglePost extends Component {
    componentDidMount() {
        console.log("SinglePost CDU props:");
        console.log("this.props");
    }

    state = {
        value: '',

    }

    render() {
        console.log("SinglePost render props:");
        console.log("this.props");


        return (
            <div>


                <div className={'post-list'}>
                    <div className={'rating'}>
                        <div>
                            <i className="fas fa-thumbs-up"></i>


                        </div>
                        <div>
                            12

                        </div>
                        <div>
                            <i className="fas fa-thumbs-down"></i>

                        </div>
                    </div>
                    <div className={'post'}>
                        React is awesome. I can now make machine learning Web Apps! Woo hoo!
                    </div>
                    <div className={'post-footer'}>
                        <div className={'post-footer comments'}><i className="far fa-comment"></i>

                        </div>
                        <div className={'post-footer author'}><i className="far fa-user"></i>

                        </div>
                        <div className={'post-footer date'}><i className="far fa-calendar-alt"></i>


                        </div>
                    </div>


                </div>


            </div>


        );
    }
}

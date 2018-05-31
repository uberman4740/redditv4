import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import './PostSummaryFooter.css'
export class PostSummaryFooter extends Component {
    componentDidMount() {
        console.log("PostSummaryFooter CDM props: ", this.props)
    }

    render() {
        console.log("PostSummaryFooter Render  props: ", this.props)

        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("PostSummaryFooter ownProps: ", ownProps)
    return {}
}
const mapDispatchToProps = (dispatch) => ({
    //getPost: (postId) => dispatch(getPost(postId))
    //getPost: () => dispatch(getPost())

})

// export default connect(mapStateToProps, mapDispatchToProps)(PostSummaryFooter)

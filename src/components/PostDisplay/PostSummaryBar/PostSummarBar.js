import React, {Component} from 'react'

import'./PostSummaryBar.css'
export class PostSummarBar extends Component {
    componentDidMount() {
        console.log("PostSummarBar CDM props: ", this.props)
    }

    render() {
        console.log("PostSummarBar Render  props: ", this.props)

        return (
            <div className={'post-summary-bar'}>
                <div className={'post-summary-bar-header'}>
                    <h1>Post Detail</h1></div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("PostSummarBar ownProps: ", ownProps)
    return {}
}
const mapDispatchToProps = (dispatch) => ({
    //getPost: (postId) => dispatch(getPost(postId))
    //getPost: () => dispatch(getPost())

})


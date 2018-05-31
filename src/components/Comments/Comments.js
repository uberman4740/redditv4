import React, {Component} from 'react'
import './Comments.css'
export class Comments extends Component {
    componentDidMount() {
        console.log("Comments CDM props: ", this.props)
    }

    render() {
        console.log("Comments Render  props: ", this.props)

        return (
            <div className={'comments-container'}>

                    <div className={'comments-rating'}>
                        <div><i class="fas fa-thumbs-up"></i>

                        </div>
                        <div><i class="fas fa-thumbs-down"></i>

                        </div>

                    </div>

                    <div className={'comments-author'}>


                        Karan</div>
                    <div className={'comments-body'}>Yes, I agree. I can now create NLP based web apps. I have so much power now but so little time.</div>
                    <div className={'comments-footer'}>
                        <div>
                            <i class="fas fa-trash-alt"></i>


                        </div>
                        <div><i class="fas fa-edit"></i>

                        </div>
                    </div>









            </div>
        )
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Comments)

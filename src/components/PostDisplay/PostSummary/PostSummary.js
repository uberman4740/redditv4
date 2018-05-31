import React, {Component} from 'react'
import './PostSummary.css';
import {PostSummarBar} from "../PostSummaryBar/PostSummarBar";
import {SinglePost} from "../../Posts/PostList/SinglePost";
import {Comments} from "../../Comments/Comments";

export class PostSummary extends Component {
    componentDidMount() {
        console.log("PostSummary CDM props: ", this.props)
    }

    render() {
        console.log("PostSummary Render  props: ", this.props)

        return (
            <div className={'post-summary-container'}>
                <PostSummarBar/>
                <div className={'post-inside'}>
                    <div className={'p-title'}>
                        <div className={'p-header'}>React is awesome. I can now make machine learning Web Apps! Woo
                            hoo!
                        </div>
                        <div className={'p-rating'}>
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
                        <div className={'p-footer'}>
                            <div><i className="far fa-comment"></i>

                            </div>
                            <div><i className="far fa-user"></i>

                            </div>
                            <div><i className="far fa-calendar-alt"></i>


                            </div>

                        </div>

                    </div>

                    <div className={'p-body'}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacus lectus, blandit eu
                            tempor vitae, suscipit sed est. Vestibulum auctor nisl quis sapien feugiat condimentum.
                            Nulla eget mollis augue, id vehicula sem. Donec ullamcorper, tellus blandit scelerisque
                            maximus, felis elit rhoncus ex, eget vulputate urna quam eu tellus. Cras elit velit,
                            malesuada vitae commodo nec, lobortis in leo. Sed ex leo, semper in mi sit amet,
                            pellentesque mollis neque. Quisque tellus orci, rhoncus non pulvinar non, luctus eu orci.
                            Nunc arcu nulla, laoreet vitae auctor non, mattis eget diam. In hac habitasse platea
                            dictumst.

                            Fusce sed sollicitudin eros, at pellentesque nisi. Aenean rhoncus condimentum ligula, vitae
                            posuere libero aliquam eget. Etiam et elit lectus. Etiam quis feugiat arcu. Pellentesque et
                            lectus orci. Nunc posuere sollicitudin sem, dignissim ornare mauris eleifend quis. Cras
                            iaculis ut libero eu tincidunt. Curabitur ut diam elementum, maximus neque at, dapibus mi.
                            Proin aliquam dapibus fringilla. Curabitur rutrum diam auctor, rutrum ex vel, condimentum
                            massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                            himenaeos. Nunc tempus laoreet tempus. Ut a elit non arcu venenatis porta. Aenean porttitor
                            consequat venenatis. Nam hendrerit, leo in dignissim mattis, tortor tortor venenatis risus
                            Fusce sed sollicitudin eros, at pellentesque nisi. Aenean rhoncus condimentum ligula, vitae
                            posuere libero aliquam eget. Etiam et elit lectus. Etiam quis feugiat arcu. Pellentesque et
                            lectus orci. Nunc posuere sollicitudin sem, dignissim ornare mauris eleifend quis. Cras
                            iaculis ut libero eu tincidunt. Curabitur ut diam elementum, maximus neque at, dapibus mi.
                            Proin aliquam dapibus fringilla. Curabitur rutrum diam auctor, rutrum ex vel, condimentum
                            massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                            himenaeos. Nunc tempus laoreet tempus. Ut a elit non arcu venenatis porta. Aenean porttitor
                            consequat venenatis. Nam hendrerit, leo in dignissim mattis, tortor tortor venenatis
                            risus,sdfssdf ac rhoncus purus metus vitae nulla.

                            Fus.
                        </p>
                    </div>
                    <div className={'p-comments'}>
                        <div className={'p-comments-header'}>Comments</div>
                        <div className={'p-comments-list'}>
                            <div>
                                <Comments/>
                            </div>
                            <div>
                                <Comments/>
                            </div>
                            <div>
                                <Comments/>
                            </div>



                        </div>


                    </div>
                </div>


            </div>

        )
    }
}




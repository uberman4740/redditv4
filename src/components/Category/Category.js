import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {getAllCategories} from "../actions/categoryActions";
import _ from 'lodash'
import {Link} from 'react-router-dom'
import './Category.css'
import {getAllCategories} from "../../actions/categoryActions";


class Category extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        this.fetchAllCategories()
    }

    fetchAllCategories = () => {
        this.props.getAllCategories().then(this.setState({loading: false}))
    }

    render() {
        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        console.log("Category render props:");
        console.log("this.props");

        return (
            <div className={'category-container'}>
                <div className={'category-bar'}>
                    <div className={"category-bar-header"}>
                        <h1>Categories</h1></div>
                    <div className={"search-category"}><i className="fas fa-search"></i>

                    </div>
                    <div className={'add-category'}><i className="fas fa-plus"></i>
                    </div>
                </div>

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

                <div className={'category-list'}>
                    {
                        _.map(this.props.categories,c=>{
                            return(
                                <div  className={'category'} key={c.id}>
                                    {c.title}
                                    {/*<Route path={`${match.url}/:categoryId`} component={SingleCategory}/>*/}
                                    {/*<Route path='/categories/:categoryId' exact component={SingleCategory}/>*/}
                                </div>
                            )
                        })
                    }


                </div>
            </div>












        );
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories())

})


export default connect(mapStateToProps, mapDispatchToProps)(Category)
import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {getAllCategories} from "../actions/categoryActions";
import _ from 'lodash'
import {Link} from 'react-router-dom'
import './Category.css'
import {getAllCategories} from "../../actions/categoryActions";


class Category extends Component {
    state = {
        loading: true,
        sortByTitleAsc: false,
        sortByTitleDesc: false

    }

    componentDidMount() {
        this.fetchAllCategories()
    }

    fetchAllCategories = () => {
        this.props.getAllCategories().then(this.setState({loading: false}))
    }
    sortByTitle = (val) => {
        if (val == 'asc'){
            this.setState({sortByTitleAsc: true})
            this.setState({sortByTitleDesc: false})
        }
        if (val == 'desc'){
            this.setState({sortByTitleAsc: false})
            this.setState({sortByTitleDesc: true})
        }
        this.fetchAllCategories()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("$$$$$$$Category CDY preProps: ", prevProps)
        console.log("$$$$$$$Category CDU prevState: ", prevState)
        console.log("$$$$$$$Category CDU state", this.state)
        // if(this.state.sortByTitleAsc !== prevState.sortByTitleAsc){
        //     this.fetchAllCategories()
        //
        // }
    }

    static getDerivedStateFromProps(props, state) {
        console.log("$$$$$ gdfp props:", props)
        console.log("$$$$$ gdfp state:", state)

    }


    render() {
        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        console.log("Category render props:");
        console.log("this.props");
        // var cat = {...this.props.categories}

        if(this.state.sortByTitleAsc === true){

            var cat = _.sortBy(this.props.categories,'title')
        }
        if(this.state.sortByTitleDesc === true){
            var cat = _.sortBy(this.props.categories,'title').reverse()
        }
        if (this.state.sortByTitleDesc ===false && this.state.sortByTitleAsc===false){
            var cat = {...this.props.categories}
        }
        console.log("dsfsadfasfdsakjesjkfkjafkjasfkjasnfdkjnfaskjfn" ,cat)



        return (
            <div className={'category-container'}>
                <div className={'category-bar'}>
                    <div className={"category-bar-header"}>
                        <h1>Categories</h1></div>
                    {/*<div className={"search-category"}><i className="fas fa-search"></i>*/}

                    {/*</div>*/}
                    {/*<div className={'add-category'}><i className="fas fa-plus"></i>*/}
                    {/*</div>*/}
                </div>

                <div className={'category-sort'}>
                    <div className={'sort'}>
                        {/*<div className={'category-sort-header '}>*/}
                            <div className={'c-dropdown'}>
                                sortBy
                                <div className="c-dropdown-content">
                                    <div onClick={() => this.sortByTitle('asc')}>title:low to high</div>
                                    <div onClick={() => this.sortByTitle('desc')}>title:high to low</div>
                                </div>
                            </div>


                        {/*</div>*/}

                    </div>
                </div>

                <div className={'category-list'}>
                    {

                            _.map(cat, c => {
                                return (
                                    <div className={'category'}>
                                        <Link className={'category'} to={`/${c.title}`} key={c.id}>
                                            {c.title}

                                            {/*<Route path={`${match.url}/:categoryId`} component={SingleCategory}/>*/}
                                            {/*<Route path='/categories/:categoryId' exact component={SingleCategory}/>*/}
                                        </Link>
                                    </div>

                                )
                            })

                    }


                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("ownPPP", ownProps)
    return {
        categories: state.categories,

    }


}
const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories())

})


export default connect(mapStateToProps, mapDispatchToProps)(Category)
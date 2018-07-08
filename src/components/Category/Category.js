import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import './Category.css'
import {getAllCategories} from "../../actions/categoryActions";
import {createPost, deletePost, editPost, getAllPosts, getCategoryPosts, votePost} from "../../actions/postActions";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Auth, API} from "aws-amplify";
import {addAuthUser} from "../../actions/authAction";


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};
const ITEM_HEIGHT = 48;

const options = [
 'Sign Out'
];

class Category extends Component {
    state = {
        loading: true,
        sortByTitleAsc: false,
        sortByTitleDesc: false,
        anchorEl: null,
        isAuthenticated: false,


    }
    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);
        this.setState({ anchorEl: null });
        this.props.addAuthUser("")
        this.props.history.push({pathname: '/signin'})

    }
    userHasAuthenticated =  authenticated => {

        this.setState({isAuthenticated: authenticated});


    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    renderDrawer = () => {
        // this.toggleDrawer('left', true)


        const { anchorEl } = this.state;





        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={anchorEl ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleLogout}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    componentDidMount() {
        this.fetchAllCategories()
    }

    fetchAllCategories = () => {
        this.props.getAllCategories().then(this.setState({loading: false}))
    }
    sortByTitle = (val) => {
        if (val == 'asc') {
            this.setState({sortByTitleAsc: true})
            this.setState({sortByTitleDesc: false})
        }
        if (val == 'desc') {
            this.setState({sortByTitleAsc: false})
            this.setState({sortByTitleDesc: true})
        }
        this.fetchAllCategories()
    }

    render() {
        const color = ['#d90015', '#dc1c17', '#e03917', '#e25819', '#e4751b'];
        // console.log("Category render props:");
        // console.log("this.props");
        // var cat = {...this.props.categories}

        if (this.state.sortByTitleAsc === true) {

            var cat = _.sortBy(this.props.categories, 'title')
        }
        if (this.state.sortByTitleDesc === true) {
            var cat = _.sortBy(this.props.categories, 'title').reverse()
        }
        if (this.state.sortByTitleDesc === false && this.state.sortByTitleAsc === false) {
            var cat = {...this.props.categories}
        }
        // console.log("dsfsadfasfdsakjesjkfkjafkjasfkjasnfdkjnfaskjfn" ,cat)


        return (
            <div>
                <div className={'category-container'}>
                    <div className={'category-bar'}>
                        <div className={'add-category'}>
                            {this.renderDrawer()}

                        </div>
                        <div className={"category-bar-header"}>
                            <h1>Categories</h1>
                        </div>
                        {/*<div className={"search-category"}><i className="fas fa-search" ></i>*/}

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
                                    <div className={'category'} key={c.title}>
                                        <Link className={'category ripple'} to={`/${c.title}`}>
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
            </div>


        );
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log("ownPPP", ownProps)
    return {
        authUser: state.authUser,

        categories: state.categories,

    }


}
const mapDispatchToProps = (dispatch) => ({
    getAllCategories: () => dispatch(getAllCategories()),
    getCategoryPosts: (category) => dispatch(getCategoryPosts(category)),
    addAuthUser: (authUser) => dispatch(addAuthUser(authUser)),



})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Category))
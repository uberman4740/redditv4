import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import './Category.css'
import {getAllCategories} from "../../actions/categoryActions";
import {getCategoryPosts} from "../../actions/postActions";
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Auth} from "aws-amplify";
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
                    style={{color:'white'}}

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
        if (val === 'asc') {
            this.setState({sortByTitleAsc: true})
            this.setState({sortByTitleDesc: false})
        }
        if (val === 'desc') {
            this.setState({sortByTitleAsc: false})
            this.setState({sortByTitleDesc: true})
        }
        this.fetchAllCategories()
    }

    render() {

        let cat;

        if (this.state.sortByTitleAsc === true) {

             cat = _.sortBy(this.props.categories, 'title')
        }
        if (this.state.sortByTitleDesc === true) {
             cat = _.sortBy(this.props.categories, 'title').reverse()
        }
        if (this.state.sortByTitleDesc === false && this.state.sortByTitleAsc === false) {
             cat = {...this.props.categories}
        }


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

                    </div>

                    <div className={'category-sort'}>
                        <div className={'sort'}>
                            <div className={'c-dropdown'}>
                                <div style={{paddingLeft:'10px'}}>sortBy</div>
                                <div className="c-dropdown-content">
                                    <div onClick={() => this.sortByTitle('asc')}>title:low to high</div>
                                    <div onClick={() => this.sortByTitle('desc')}>title:high to low</div>
                                </div>
                            </div>





                        </div>
                    </div>

                    <div className={'category-list'}>
                        {

                            _.map(cat, c => {
                                return (
                                    <div className={'category'} key={c.title}>
                                        <Link className={'category ripple'} to={`/${c.title}`}>
                                            {c.title}
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


const mapStateToProps = (state) => {
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
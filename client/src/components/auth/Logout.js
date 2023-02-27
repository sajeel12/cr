import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from "../../actions/authActions";
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import {Navigate} from 'react-router-dom';


export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }
   

    state ={
        logout: false
    }

    onClick = (e) => {
        this.props.logout();
        this.setState({logout: true})
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        return (

            <Fragment>
                <NavLink onClick={this.onClick}  >
                    Logout
                </NavLink>
                {/* <Navigate  to='/' /> */}
                {this.state.logout && 
                    <Navigate to='/' />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Logout);
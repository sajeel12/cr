import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from "../../actions/authActions";
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import {Navigate} from 'react-router-dom';



export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    onClick = (e) => {
        this.props.logout();
        return <Navigate to='/' />;
    }

    render() {
        return (

            <Fragment>
                <NavLink onClick={this.onClick}  >
                    Logout
                </NavLink>
                {/* <Navigate  to='/' /> */}
            </Fragment>
        )
    }
}


export default connect(logout, { logout })(Logout);
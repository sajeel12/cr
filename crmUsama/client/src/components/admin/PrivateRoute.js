import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Outlet, Navigate} from 'react-router-dom';

export class PrivateRoute extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    render() {
        const {isAuthenticated} = this.props.auth;
        return (
            isAuthenticated? <Outlet /> :  <Navigate  to='/c' />
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
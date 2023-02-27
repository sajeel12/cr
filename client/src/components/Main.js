import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import LoginModal from './auth/LoginModal';
import MainAdmin from './admin/MainAdmin';
import RegisterModel from './auth/RegisterModel';
import { BrowserRouter, Navigate } from 'react-router-dom';
class Main extends Component {


    state = {
        msg: null,
        isadmin: null
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }




    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props.auth;
        if (error !== prevProps.error) {
            //check for  regiser error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null })
            }
        }
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        return (
            <div>
                
                    {/* {!isAuthenticated ?
                        <Navigate to='common/login' /> :
                        // user.isadmin ?

                        <> */}
                            <MainAdmin />

                        {/* </>
                        // <MainClient />


                    } */}
                

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, {})(Main);
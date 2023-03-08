import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from "../../actions/authActions";
import PropTypes from 'prop-types';
import { NavLink } from 'reactstrap';
import { Navigate } from 'react-router-dom';
import { Modal, Box, Typography } from '@mui/material'
import Spinner from 'react-bootstrap/Spinner';

export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }


    state = {
        logout: false
    }

    onClick = (e) => {
        this.props.logout();
        this.setState({ logout: true })
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (

            <Fragment>
                <NavLink onClick={this.onClick} style={{color:'#707070'}}  >
                    Logout
                </NavLink>
                {/* <Navigate  to='/' /> */}
                {this.state.logout &&
                    <>
                        <Navigate to='/' />
                        <Modal
                            open={true}

                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            sx={{ overflowX: 'scroll' }}
                        >
                            <Box sx={this.style}>

                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {/* <Typography variant="h5" component="h2">
                                Logging Out ....
                            </Typography> */}

                                    <Spinner style={{ position: 'absolute', top: 200, left: 700 }} animation="grow" variant="warning" />








                                </Box>



                            </Box>
                        </Modal>

                    </>

                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Logout);
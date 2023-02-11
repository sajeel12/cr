import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavAdmin from './NavAdmin';
import BodyAdmin from './BodyAdmin';
import BodyAgent from './BodyAgent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

class MainAdmin extends Component {
    DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    render() {

        const { user } = this.props.auth;

        return (
            <div>
                <BrowserRouter>

                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex' }}>
                            <NavAdmin username={user.username} isadmin={user.isadmin} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                <this.DrawerHeader />


                                {/*    routes ================================= */}
                                <Routes>
                                    <Route path='/' element={


                                        
                                            <BodyAdmin />
                                            

                                    } />
                                    <Route path='agents' element={

                                        user.isadmin ?
                                            <BodyAgent />
                                            :
                                            ''

                                    } />
                                </Routes>


                                {/* routes ================================= */}
                            </Box>




                        </Box>
                    </Box>

                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MainAdmin);

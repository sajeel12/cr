import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavAdmin from './NavAdmin';
import BodyAdmin from './BodyAdmin';
import BodyAgent from './BodyAgent';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Archived from '../client/Archived';
import Dispatched from '../client/Dispatched';
import FollowUp from '../client/FollowUp';
import Orders from '../client/Orders';
import Potential from '../client/Potential';
import Quotes from '../client/Quotes';
import AgreementForm from '../client/AgreementForm';
import LoginModal from '../auth/LoginModal';
import AgreementWrapper from '../client/AgreementWrapper';
import AgreementPanel from '../client/AgreementPanel';
import Vendors from './Vendors';

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

        const { user, isAuthenticated } = this.props.auth;

        return (
            <div>




                {/*    routes ================================= */}
                <Routes>

                    {isAuthenticated ?
                        <Route path='/'  >

                            <Route index element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <BodyAdmin />

                                        </Box>
                                    </Box>
                                </Box>


                            } />

                            <Route path='login' element={
                                isAuthenticated &&
                                // <Navigate to='/lead' />
                                // :
                                <Navigate to='/' />

                            } />
                            <Route path='/agents' element={

                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            {user.isadmin ?
                                                <BodyAgent />
                                                :
                                                ''
                                            }
                                        </Box>
                                    </Box>
                                </Box>

                            } />
                            <Route path='/vendors' element={

                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            {user.isadmin ?
                                                <Vendors/>
                                                :
                                                ''
                                            }
                                        </Box>
                                    </Box>
                                </Box>

                            } />
                            <Route path='/archived' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <Archived />
                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/dispatched' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <Dispatched />

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/followup' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />
                                            <FollowUp />
                                            {/* <Navigate to='/followup'/> */}

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/orders' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <Orders />

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/potential' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <Potential />

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/quotes' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <Quotes />

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                            <Route path='/customer_agreement' element={
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <NavAdmin username={user.username} isadmin={user.isadmin} />
                                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                                            <this.DrawerHeader />

                                            <AgreementPanel />

                                        </Box>
                                    </Box>
                                </Box>
                            } />
                        </Route>

                        :


                        <Route path='/' >
                            <Route index element={

                                <Navigate to='login' />
                            } />

                            <Route path='login'  >
                                <Route index element={
                                    <LoginModal />
                                } />

                            </Route>
                            <Route path='/crm' element={
                                isAuthenticated ?
                                    <Navigate to='/login' />
                                    :
                                    <Navigate to='/login' />

                            } />

                            <Route path='agreement' element={<AgreementWrapper />} />
                        </Route>


                    }
                    {console.log(isAuthenticated)}

                </Routes>



                {/* routes ================================= */}


            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(MainAdmin);

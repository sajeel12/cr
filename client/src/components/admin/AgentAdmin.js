import React, { Component } from 'react'
import {
    Typography, Box, Modal, Button,
    TextField, Divider

} from '@mui/material';
import { v1 as uuid } from 'uuid';


import { connect } from "react-redux";
import { getLeadsAgent } from '../../actions/leadActions'
import { getAgents } from '../../actions/agentActions';
import PropTypes from 'prop-types';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArchiveIcon from '@mui/icons-material/Archive';
import CloudIcon from '@mui/icons-material/Cloud';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


import moment from 'moment';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#009b9b',
        color: theme.palette.common.white,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,

    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        // backgroundColor: 'green',


    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





class AgentAdmin extends Component {





    // =========================================
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1300,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    state = {
        open: false,
        selected: '',
        navval: '',


    }

    componentDidMount() {
        console.log(this.props.idt);
        this.props.getLeadsAgent(this.props.idt);

    }



    static propTypes = {
        auth: PropTypes.object.isRequired,
        lead: PropTypes.object.isRequired,
        getLeadsAgent: PropTypes.func.isRequired
    }





    handleClose = () => {
        this.setState({
            open: !this.state.open
        });
    }

    handleNav = (e, navval) => {
        this.setState({ navval: navval })
    };

    render() {
        const { user } = this.props.auth;
        const { leads } = this.props.lead;

        return (
            <div>
                <Button onClick={this.handleClose} variant='contained'
                    sx={{
                        width: 170,
                        backgroundColor: '#E8F8F9', color: '#009B9B',
                        "&:hover": {
                            backgroundColor: '#009B9B',
                            color: '#E8F8F9'
                        },

                        borderRadius: 50
                    }}
                >
                    Agent Activity
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
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
                            <Typography variant="h5" component="h2">
                                Agent Activity
                            </Typography>
                            <hr />

                            Total Leads =  (<span style={{ color: '#26a500', fontWeight: 'bold' }} > {leads.length} </span>)

                            <hr />

                            <BottomNavigation sx={{ marginLeft: 50, width: 450 }} value={this.state.navval} onChange={this.handleNav}>
                                <BottomNavigationAction
                                    label="Leads"
                                    value="lead"
                                    icon={<LeaderboardIcon />}
                                    sx={{color:'#009b9b'}}
                                />
                                <BottomNavigationAction
                                    label="Followup"
                                    value="followup"
                                    icon={<FormatQuoteIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                                <BottomNavigationAction
                                    label="Quotes"
                                    value="quote"
                                    icon={<BookOnlineIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                                <BottomNavigationAction
                                    label="Orders"
                                    value="order"
                                    icon={<LocalShippingIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                                <BottomNavigationAction
                                    label="Dispatched"
                                    value="dispatched"
                                    icon={<ArchiveIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                                <BottomNavigationAction
                                    label="Archived"
                                    value="archived"
                                    icon={<CloudIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                                <BottomNavigationAction
                                    label="Potential"
                                    value="potential"
                                    icon={<NoteAltIcon />}
                                    sx={{color:'#009b9b'}}

                                />
                            </BottomNavigation>
                            <hr />

                            <div>
                                <Container sx={{ width: 1400 }}  >

                                    <TableContainer component={Paper} sx={{ maxHeight: 250, maxWidth: 1600, overflowY: 'scroll' }}  >
                                        <Table sx={{ minWidth: 1600 }} aria-label="customized table"  >
                                            <TableHead>
                                                <TableRow  >

                                                    <StyledTableCell>FullName </StyledTableCell>
                                                    <StyledTableCell align="center">Email</StyledTableCell>
                                                    <StyledTableCell align="center">Phone NO&nbsp;</StyledTableCell>
                                                    <StyledTableCell align="center">Lead Id&nbsp;</StyledTableCell>

                                                    <StyledTableCell align="center">Ship Date&nbsp;</StyledTableCell>
                                                    <StyledTableCell align="center">Vehicles&nbsp;</StyledTableCell>

                                                    <StyledTableCell align="center">Recieved Date&nbsp;</StyledTableCell>
                                                    <StyledTableCell align="center">Time&nbsp;</StyledTableCell>
                                                    <StyledTableCell align="center">Total Mails&nbsp;</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {leads.map((row) => (
                                                    row.status === this.state.navval &&

                                                    <StyledTableRow key={row._id}
                                                        sx={
                                                            row.mailsent && { backgroundColor: '#F7E771' }
                                                        }
                                                    >





                                                        <StyledTableCell component="th" scope="row">
                                                            {row.fullname}

                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.leadid}</StyledTableCell>

                                                        <StyledTableCell align="center">{row.shipdate}</StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <table>
                                                                <tr>
                                                                    <th style={{ paddingLeft: 20 }} > Year</th>
                                                                    <th style={{ paddingLeft: 20 }}> Make</th>
                                                                    <th style={{ paddingLeft: 20 }}> Model</th>
                                                                    <th style={{ paddingLeft: 20 }}> Type</th>
                                                                </tr>
                                                                {row.vehicle?.map((vehicle) => (
                                                                    < tr >
                                                                        <td style={{ paddingLeft: 20 }} > {vehicle.modelyear}</td>
                                                                        <td style={{ paddingLeft: 20 }} > {vehicle.make}</td>
                                                                        <td style={{ paddingLeft: 20 }}> {vehicle.model}</td>
                                                                        <td style={{ paddingLeft: 20 }}> {vehicle.vehicletype}</td>
                                                                    </tr>
                                                                ))}
                                                            </table>

                                                        </StyledTableCell>

                                                        <StyledTableCell align="center">{moment(row.recieveddate).format("ddd, MMM D YYYY")}</StyledTableCell>
                                                        <StyledTableCell align="center">{moment(row.recieveddate).format("h:mm a")}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.mailcount}</StyledTableCell>

                                                    </StyledTableRow>


                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Container>

                            </div>


                        </Box>



                    </Box>
                </Modal>
            </div >
        )
    }
}

AgentAdmin.propTypes = {
    getLeadsAgent: PropTypes.func.isRequired,
    lead: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    lead: state.lead,
    auth: state.auth
});



export default connect(mapStateToProps, { getLeadsAgent })(AgentAdmin);
import * as React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, TextField } from '@mui/material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { connect } from 'react-redux';
import { getLeads, deleteLead } from '../../actions/leadActions'
// import ItemModal from './ItemModal';
import PropTypes from 'prop-types';
import { Component } from 'react';

import SendMail from '../client/SendMail';

import moment from 'moment';
import DeleteLead from './DeleteLead';
import AssignLead from './AssignLead';
import UpdateLead from './UpdateLead';
import UpdateStatus from '../client/UpdateStatus';
import SendMsg from '../client/SendMsg';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteLeadM from './DeleteLeadM';
import UpdateStatusM from '../client/UpdateStatusM';
import SendMailM from '../client/SendMailM';
import AssignLeadM from './AssignLeadM';
import AddLead from '../common/AddLead';
import { display } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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



class LeadAdmin extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        lead: PropTypes.object.isRequired
    }


    searchStyle = {
        border: 'none',
        borderRadius: 50,
        width: 200,
        paddingLeft: 42,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 20

    }


    state = {
        leads: [],
        checkedvalue: [],
        checkedinputs: [],
        checkedids: [],
        checkedemail: [],
        searchedval: "",
        realtime: true
    }

    componentDidMount() {
        this.props.getLeads();

        this.interval = setInterval(() => {
            if (this.state.realtime) {
                this.props.getLeads();
                this.setState({ leads: this.props.lead.leads });
                console.log(this.state.leads);
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSwitch = (e) => {
        this.setState({ realtime: !this.state.realtime });
        console.log(this.state.realtime);
    }

    handleCheck = (e) => {

        const { name, checked } = e.target;
        const leads = this.state.leads

        if (name === 'allcheck') {
            const checkedvalue = leads.map((lead) => {
                return { ...lead, ischecked: checked }
            });
            this.setState({ leads: checkedvalue })

            const checkedinputs = checkedvalue.filter(lead => lead.ischecked === true);
            this.setState({ checkedinputs: checkedinputs });

            const checkedids = checkedinputs.map((lead) => (lead._id));
            this.setState({ checkedids: checkedids });

            const checkedemail = checkedinputs.map((lead) => (lead.email));
            this.setState({ checkedemail: checkedemail });


            console.log(JSON.stringify(checkedids));
        }
        else {

            const checkedvalue = leads.map((lead) => (
                lead._id === name ? { ...lead, ischecked: checked } : lead
            ));
            this.setState({ leads: checkedvalue })

            const checkedinputs = checkedvalue.filter(lead => lead.ischecked === true);
            this.setState({ checkedinputs: checkedinputs });

            const checkedids = checkedinputs.map((lead) => (lead._id));
            this.setState({ checkedids: checkedids });

            const checkedemail = checkedinputs.map((lead) => (lead.email));
            this.setState({ checkedemail: checkedemail });


            console.log(JSON.stringify(checkedids));
        }
    }



    // componentDidUpdate() {
    //     this.props.getLeads();
    // }


    render() {
        const { leads, loading } = this.props.lead;
        const { user } = this.props.auth;

        return (
            <Container sx={{ width: 1400 }}  >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <div style={{ display: 'flex', marginTop: 50, marginBottom: 50 }} >
                        {/* <TextField
                            sx={{ width: 150 }}
                            id="standard-password-input"
                            label="Search Lead"
                            
                            // label="Search Lead" 
                            variant="standard"
                            onChange={(e) => this.setState({ searchedval: e.target.value })} /> */}

                        <input className='searchLead' type="text" placeholder='Search Lead'
                            style={this.searchStyle}
                            onChange={(e) => this.setState({ searchedval: e.target.value })}
                        />



                        <AddLead />

                    </div>
                    <div style={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >

                        <div>

                            {this.state.realtime ? '' :
                                user.isadmin ?
                                    <div style={{ display: 'flex' }} >
                                        <DeleteLeadM checkedids={this.state.checkedids} />
                                        <AssignLeadM checkedids={this.state.checkedids} />
                                    </div>
                                    :
                                    <div style={{ display: 'flex', marginBottom: 5 }} >

                                        <SendMailM checkedids={this.state.checkedids} checkedemail={this.state.checkedemail} many={true} fromemail={user.email} />
                                        <UpdateStatusM checkedids={this.state.checkedids} />
                                    </div>
                            }
                        </div>
                        <FormGroup>
                            <FormControlLabel control={<Switch color='warning' checked={this.state.realtime} onChange={this.handleSwitch} />} label="Real Time" />
                        </FormGroup>
                    </div>


                </div>

                <TableContainer component={Paper} sx={{ maxHeight: 350, maxWidth: 1400, overflowY: 'scroll' }}  >
                    <Table sx={{ minWidth: 1600 }} aria-label="customized table"  >
                        <TableHead>
                            <TableRow  >
                                {!this.state.realtime &&
                                    <StyledTableCell component="th" scope="row">
                                        <input type="checkbox" style={{ width: 18, height: 18 }} name="allcheck" checked={!leads.some((lead) => lead?.ischecked !== true)} onChange={this.handleCheck} />
                                    </StyledTableCell>
                                }

                                <StyledTableCell>FullName </StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone NO&nbsp;</StyledTableCell>
                                {user.isadmin ?
                                    <>
                                        <StyledTableCell align="center">Assigned To&nbsp;</StyledTableCell>
                                        <StyledTableCell align="center">Lead By&nbsp;</StyledTableCell>
                                    </>
                                    : ''}
                                <StyledTableCell align="center">Lead Id&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Make&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Model&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Year&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Ship Date&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Vehicle Type&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Recieved Date&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Time&nbsp;</StyledTableCell>
                                <StyledTableCell sx={{ width: 300 }} align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.leads.filter((row) =>
                                // note that I've incorporated the searchedVal length check here
                                !this.state.searchedval.length || row.leadid
                                    .toString()
                                    .toLowerCase()
                                    .includes(this.state.searchedval.toString().toLowerCase())
                            )
                                .map((row) => (

                                    <StyledTableRow key={row._id} sx={


                                        user.isadmin ?
                                            row.isassigned ? { backgroundColor: '#8EE2B8' } : { backgroundColor: '' }
                                            :
                                            row.mailsent ? { backgroundColor: '#F7E771' } : ''}

                                    // row.isassigned ?
                                    //     user.isadmin ?
                                    //         { backgroundColor: '#8EE2B8' } : { backgroundColor: '' }
                                    //     : row.mailsent ? { backgroundColor: '#F7E771' } : ''} 
                                    >

                                        {user.isadmin ?
                                            <>
                                                {!this.state.realtime &&
                                                    <StyledTableCell component="th" scope="row">
                                                        <input type="checkbox" name={row._id} checked={row?.ischecked || false} onChange={this.handleCheck} />
                                                    </StyledTableCell>
                                                }
                                                <StyledTableCell component="th" scope="row">
                                                    {row.fullname}

                                                </StyledTableCell>
                                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                                <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
                                                {user.isadmin ?
                                                    <>
                                                        <StyledTableCell align="center">{row.isassigned ? row.owner?.username : 'N/A'}</StyledTableCell>
                                                        <StyledTableCell align="center">{row.owner ? row.owner.username === user.username ? "You" : row.owner.username : "N/A"}</StyledTableCell>
                                                    </>
                                                    : ''}
                                                <StyledTableCell align="center">{row.leadid}</StyledTableCell>
                                                <StyledTableCell align="center">{row.make}</StyledTableCell>
                                                <StyledTableCell align="center">{row.model}</StyledTableCell>
                                                <StyledTableCell align="center">{row.modelyear}</StyledTableCell>
                                                <StyledTableCell align="center">{row.shipdate}</StyledTableCell>
                                                <StyledTableCell align="center">{row.vehicletype}</StyledTableCell>
                                                <StyledTableCell align="center">{moment(row.recieveddate).format("ddd, MMM D YYYY")}</StyledTableCell>
                                                <StyledTableCell align="center">{moment(row.recieveddate).format("h:mm a")}</StyledTableCell>
                                                <StyledTableCell align="center"  >
                                                    <Stack spacing={2} direction="row">
                                                        {user.isadmin ?
                                                            <>

                                                                {/* <Button variant="contained" sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }}>Cherry</Button> */}
                                                                <UpdateLead {...row} />
                                                                <DeleteLead id={row._id} name={row.fullname} />
                                                                <AssignLead leadid={row._id} isassigned={row.isassigned} />
                                                            </>
                                                            :

                                                            <>

                                                                <SendMail toemail={row.email} many={false} mailcount={row.mailcount} leadid={row._id} fromemail={user.email} />
                                                                <SendMsg  {...row} />
                                                                <Button variant="contained" sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }} >Orange</Button>
                                                                <UpdateStatus leadid={row._id} />
                                                                <UpdateLead {...row} />
                                                            </>

                                                        }

                                                    </Stack>
                                                </StyledTableCell>
                                            </>
                                            :
                                            row.status == 'lead' ?
                                                <>
                                                    {!this.state.realtime &&
                                                        <StyledTableCell component="th" scope="row">
                                                            <input type="checkbox" name={row._id} checked={row?.ischecked || false} onChange={this.handleCheck} />
                                                        </StyledTableCell>
                                                    }
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.fullname}

                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
                                                    {user.isadmin ?
                                                        <>
                                                            <StyledTableCell align="center">{row.isassigned ? row.owner.username : 'N/A'}</StyledTableCell>
                                                            <StyledTableCell align="center">{row.owner.username === user.username ? "You" : row.owner.username}</StyledTableCell>
                                                        </>
                                                        : ''}
                                                    <StyledTableCell align="center">{row.leadid}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.make}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.model}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.modelyear}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.shipdate}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.vehicletype}</StyledTableCell>
                                                    <StyledTableCell align="center">{moment(row.recieveddate).format("ddd, MMM D YYYY")}</StyledTableCell>
                                                    <StyledTableCell align="center">{moment(row.recieveddate).format("h:mm a")}</StyledTableCell>
                                                    <StyledTableCell align="center"  >
                                                        <Stack spacing={2} direction="row">
                                                            {user.isadmin ?
                                                                <>

                                                                    {/* <Button variant="contained" sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }}>Cherry</Button> */}
                                                                    <UpdateLead {...row} />
                                                                    <DeleteLead id={row._id} name={row.fullname} />
                                                                    <AssignLead leadid={row._id} isassigned={row.isassigned} />
                                                                </>
                                                                :

                                                                <>

                                                                    <SendMail {...row} many={false} fromemail={user.email} />
                                                                    <SendMsg  {...row} />
                                                                    <Button variant="contained" sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }} >Orange</Button>
                                                                    <UpdateStatus leadid={row._id} />
                                                                    <UpdateLead {...row} />
                                                                </>

                                                            }

                                                        </Stack>
                                                    </StyledTableCell>
                                                </>
                                                : ''}



                                    </StyledTableRow>

                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        );
    }
}

LeadAdmin.propTypes = {
    getLeads: PropTypes.func.isRequired,
    lead: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    lead: state.lead,
    auth: state.auth,

})



export default connect(mapStateToProps, { getLeads })(LeadAdmin);
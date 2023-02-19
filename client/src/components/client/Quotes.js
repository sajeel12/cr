import * as React from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { connect } from 'react-redux';
import { getLeads, deleteLead } from '../../actions/leadActions'
// import ItemModal from './ItemModal';
import PropTypes from 'prop-types';
import { Component } from 'react';

import SendMail from '../client/SendMail';

import moment from 'moment';
import UpdateStatus from './UpdateStatus';
import SendMsg from './SendMsg';
import UpdateLead from '../admin/UpdateLead';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteLeadM from '../admin/DeleteLeadM';
import UpdateStatusM from './UpdateStatusM';
import Switch from '@mui/material/Switch';

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

function createData(fullName, email, phoneNo, leadId, make, model, year, vehicleType, recievedDate, actions) {
    return { fullName, email, phoneNo, leadId, make, model, year, vehicleType, recievedDate, actions };
}

class Quotes extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    state = {
        leads: [],
        checkedvalue: [],
        checkedinputs: [],
        checkedids: [],
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
        const checkedvalue = leads.map((lead) => (
            lead.fullname === name ? { ...lead, ischecked: checked } : lead
        ));
        console.log(checkedvalue);
        this.setState({ leads: checkedvalue })

        const checkedinputs = checkedvalue.filter(lead => lead.ischecked === true);
        this.setState({ checkedinputs: checkedinputs });

        const checkedids = checkedinputs.map((lead) => (lead._id));
        this.setState({ checkedids: checkedids });

        console.log(JSON.stringify(checkedids));

    }

    render() {
        const { leads } = this.props.lead;
        const { user } = this.props.auth;

        return (
            <Container sx={{ width: 1400 }}  >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <div>
                        {this.state.realtime ? '' :
                            user.isadmin ?
                                <DeleteLeadM checkedids={this.state.checkedids} />
                                :
                                <UpdateStatusM checkedids={this.state.checkedids} />
                        }
                    </div>
                    <FormGroup>
                        <FormControlLabel control={<Switch color='warning' checked={this.state.realtime} onChange={this.handleSwitch} />} label="Real Time" />
                    </FormGroup>
                </div>
                <TableContainer component={Paper} sx={{ maxHeight: 500, maxWidth: 1600, overflowY: 'scroll' }}  >
                    <Table sx={{ minWidth: 1600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {!this.state.realtime &&
                                    <StyledTableCell> </StyledTableCell>
                                }
                                <StyledTableCell>FullName </StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone NO&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Assigned To&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Lead Id&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Make&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Model&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Year&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Vehicle Type&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Recieved Date&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Time&nbsp;</StyledTableCell>
                                <StyledTableCell sx={{ width: 300 }} align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leads.map((row) => (

                                <StyledTableRow key={row.fullname} sx={row.isassigned ? user.isadmin ? { backgroundColor: '#8EE2B8' } : { backgroundColor: '' } : ''} >

                                    {row.status === 'quotes' ?
                                        <>
                                            {!this.state.realtime &&
                                                <StyledTableCell component="th" scope="row">
                                                    <input type="checkbox" name={row.fullname} checked={row?.ischecked || false} onChange={this.handleCheck} />
                                                </StyledTableCell>
                                            }
                                            <StyledTableCell component="th" scope="row">
                                                {row.fullname}

                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.email}</StyledTableCell>
                                            <StyledTableCell align="center">{row.phoneno}</StyledTableCell>
                                            <StyledTableCell align="center">{row.isassigned ? row.owner.username : 'N/A'}</StyledTableCell>

                                            <StyledTableCell align="center">{row._id}</StyledTableCell>
                                            <StyledTableCell align="center">{row.make}</StyledTableCell>
                                            <StyledTableCell align="center">{row.model}</StyledTableCell>
                                            <StyledTableCell align="center">{row.modelyear}</StyledTableCell>
                                            <StyledTableCell align="center">{row.vehicletype}</StyledTableCell>
                                            <StyledTableCell align="center">{moment(row.recieveddate).format("ddd, MMM D YYYY")}</StyledTableCell>
                                            <StyledTableCell align="center">{moment(row.recieveddate).format("h:mm a")}</StyledTableCell>
                                            <StyledTableCell align="center"  >
                                                <Stack spacing={2} direction="row">


                                                    <SendMail email={row.email} />

                                                    <SendMsg {...row} />
                                                    <Button variant="contained" sx={{ width: 80, backgroundColor: 'black', borderRadius: 50 }} >Orange</Button>
                                                    <UpdateStatus leadid={row._id} />
                                                    <UpdateLead {...row} />

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

Quotes.propTypes = {
    getLeads: PropTypes.func.isRequired,
    lead: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    lead: state.lead,
    auth: state.auth
})



export default connect(mapStateToProps, { getLeads })(Quotes);
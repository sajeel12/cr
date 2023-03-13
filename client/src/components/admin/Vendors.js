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

import { getVendors } from '../../actions//vendorActions';
import moment from 'moment';
import DeleteLead from './DeleteLead';
import Spinner from 'react-bootstrap/Spinner';
import DeleteAgent from './DeleteAgent';
import AgentAdmin from './AgentAdmin';
import AgentAdmin2 from './AgentAdmin2';


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
        backgroundColor: theme.palette.action.hover,


    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



class Vendors extends Component {


    componentDidMount() {
        this.props.getVendors();

        this.interval = setInterval(() => {

            this.props.getVendors();

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { vendors } = this.props.vendor;
       
        const { user } = this.props.auth;

        return (
            <Container sx={{ width: 1400 }}  >

                <TableContainer component={Paper} sx={{ maxHeight: 500, maxWidth: 1600, overflowY: 'scroll' }}  >
                    <Table sx={{ minWidth: 1000, minHeight: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>

                                <StyledTableCell align="center">Username</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                               

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vendors.map((row) => (

                                <StyledTableRow key={row._id}>




                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.email}</StyledTableCell>

                                   
                                    <StyledTableCell align="right">
                                       
                                    </StyledTableCell>




                                </StyledTableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        );
    }
}

Vendors.propTypes = {
    getVendors: PropTypes.func.isRequired,
    vendor: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => ({
    vendor: state.vendor,
    auth: state.auth
});


export default connect(mapStateToProps, { getVendors })(Vendors);
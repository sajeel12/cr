import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField, Container, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAgreement } from '../../actions/agreementAction';
import AgreementForm from './AgreementForm';
import Agreement from './Agreement';




export class AgreementWrapper1 extends Component {

    static = {
        getAgreement: PropTypes.func.isRequired,
        agreement: PropTypes.object.isRequired
    }

    componentDidMount = () => {
        const lead_id = this.props.params.get("hash_id");
        this.props.getAgreement(lead_id);

       
    }
    
  

    render() {

        const { agreements , loading } = this.props.agreement;
        const agr = agreements
        return (
            <>
            {agr?.isagreed? 
                <Agreement params={this.props.params} />
            :
            <AgreementForm params={this.props.params} loading={loading}fullname={agr.fullname} />
            }
            {/* <h4>{agr.fullname}</h4>/ */}
            </>
        )
    }
}

AgreementForm.propTypes = {
    getAgreement: PropTypes.func.isRequired,
    agreement: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    agreement: state.agreement
});


export default connect(mapStateToProps, { getAgreement })(AgreementWrapper1);
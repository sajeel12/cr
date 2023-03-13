import React, { Component } from "react";

import { connect } from "react-redux";
import {
    Typography, Box, Modal, Button,
    TextField

} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { clearErrors } from "../../actions/errorActions";
import { sendMail } from "../../actions/mailActions";
import emailjs from '@emailjs/browser';




class SendInstruction extends Component {

    state = {

        open: false,
        company: '',
        template: '',
        tempselected: '',
        subject: ''
    }


    apiinstruction = `
     <h3>   this is the instruction for API </h3> 
    `;




    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    static propTypes = {
        auth: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        sendMail: PropTypes.func.isRequired
    }


    onTemplate = (e) => {
        this.setState({ tempselected: e.target.value })
        if (e.target.value === '1') {
            this.setState({ template: this.newquotehtml, subject: " Shipment Details " })
        } else if (e.target.value === '2') {
            this.setState({ template: this.dispatchedhtml, subject: "Dispatched to Destination" })
        } else if (e.target.value === '3') {
            this.setState({ template: this.followuphtml, subject: "FollowUp" })
        } else if (e.target.value === '4') {
            this.setState({ template: this.orderconfirmationhtml, subject: "Confirm Your Order Please..." })
        } else if (e.target.value === '5') {
            this.setState({ template: this.paymentrecievedhtml, subject: "Payment Recieved" })
        } else if (e.target.value === '6') {
            this.setState({ template: this.agreement, subject: "Order Agreement" })
        }
        else {
            this.setState({ template: this.secondfollowuphtml, subject: "Follow UP" })
        }

    }


    onCompany = (e) => {
        this.setState({ comppselected: e.target.value })
        if (e.target.value === 'SM Transports') {
            this.setState({ company: "SM Transports" })
        } else {
            this.setState({ company: "HS Logistics" })
        }

    }


    handleChange = (e) => {
        this.setState({
            company: e.target.value
        });
    };

    toggle = () => {
        // clear errors
        this.props.clearErrors();

        this.setState({
            open: !this.state.open
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const subject_check = this.state.subject;
        // if(this.state.template !== '')


        const to = this.props.email;
        const id = this.props._id;
        const { user } = this.props.auth;
        const { email, emailpass, _id } = user;
        const subject = "Lead API Instructions";
        const html = this.apiinstruction;

        const mail = {
            email,
            emailpass,
            
            to,
            id,
            vendor: true,
            subject,
            html,
            many: false
        }
        console.log(mail);
        this.props.sendMail(mail);

        this.toggle();


    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>

                <Button onClick={this.onSubmit} variant='contained'
                    sx={{
                        width: 200,
                        marginRight: 1, 
                        backgroundColor: this.props.mailsent ? '#F7E771' : 'black',
                        color: this.props.mailsent ? 'black' : '',
                        borderRadius: 50
                    }}>
                    {this.props.mailsent ? 'Already Sent  ' : 'Send Instructions'}
                    

                </Button>

                <Modal
                    open={this.state.open}
                    onClose={this.toggle}
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
                                Send Email
                            </Typography>

                            <hr />
                            <form  >
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Company</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.company}
                                        onChange={this.onCompany}
                                        label="Company"
                                    >
                                        <MenuItem value="SM Transports" >SM Transports</MenuItem>
                                        <MenuItem value="HS Logistics" >HS Logistics</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>

                                    <InputLabel id="demo-simple-select-standard-label">Select Template</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.selected}
                                        onChange={this.onTemplate}
                                        label="Select Template"
                                    >

                                        <MenuItem value='1' >New Quote</MenuItem>
                                        <MenuItem value='2' >Dispatched</MenuItem>
                                        <MenuItem value='3' >FollowUp</MenuItem>
                                        <MenuItem value='4' >Order Confirmation</MenuItem>
                                        <MenuItem value='5' >Payment Recieved</MenuItem>
                                        <MenuItem value='6' >Agreemnet</MenuItem>
                                        <MenuItem value='7' >Second FollowUp</MenuItem>

                                    </Select>


                                </FormControl>

                                <TextField

                                    onChange={this.onChange}
                                    name='from'
                                    id="standard-read-only-input"
                                    label="from"
                                    type="text"
                                    variant="standard"
                                    value={this.props.fromemail}

                                />



                                <TextField

                                    onChange={this.onChange}
                                    name='to'
                                    id="standard-read-only-input"
                                    label="To"
                                    type="text"
                                    variant="standard"
                                    value={this.props.email}

                                />

                            </form>

                            <Button variant='contained'
                                sx={{ marginBottom: 5 }}
                                onClick={this.onSubmit}
                            >
                                Send
                            </Button>


                        </Box>



                    </Box>
                </Modal>
            </div>

        )
    };
}

SendInstruction.propTypes = {
    sendMail: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors, sendMail })(SendInstruction);

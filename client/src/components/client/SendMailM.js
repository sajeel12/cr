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
import Alert from '@mui/material/Alert';

class SendMailM extends Component {

    state = {

        open: false,
        company: '',
        template: '',
        tempselected: '',
        subject: ''


    }


    agreement = `
     <h4>   Please Confirm your Shipment <a href="http://www.crmsmtransports.site/agreement?hash_id=${this.props._id}" >Click here</a>  </h4> 
    <br/> <hr/>  <h2 style='color:red' > HS Logistics </h2> 
    `;

    newquotehtml = `
    <div style="margin: 0 5%;">
    <div style="  align-items: center;">
        <h1 style="color: rgba(0, 0, 0, 0.692);">Hi ${this.props.fullname}</h1>
        <br>
        <p>Thank you for your interest in our company! Below you will find your auto transport quote details.</p>
    </div>
    <br>
    <hr>
    <div style="display: flex; justify-content: space-between;">
        <p>Door to Door Service</p>
        <p>${this.props.price} $</p>
    </div>
    <hr>
    <div style="display: flex; justify-content: space-between; background-color: rgba(255, 235, 205, 0.712);">
        <p><b>Total </b></p> 
        <p style="color: rgb(4, 139, 72);">  ${this.props.price}$</p>
    </div>
    <hr>
    <br>
    <h2 style="color: rgba(0, 0, 0, 0.733);">Quote Details</h2>
    <br>
    <p style="color: rgba(0, 0, 0, 0.692);">
        Quote ID: ${this.props._id} <br>
        ${this.props.year} ${this.props.make} ${this.props.model}<br>
        Origin: ${this.props.origincity}, ${this.props.originstate} ${this.props.originzipcode} <br>
        Destination: ${this.props.destinationcity}, ${this.props.destinationstate} ${this.props.destinationzipcode}<br>
        Available Date: ${this.props.shipdate} <br>
        Carrier Type: Open<br>
        Deposit: $600,000<br>
        Total Cost: $${this.props.price}<br>
        If you have any questions or would like us to match a competitor's rate please call me at (516) 656-1474.
        Regards,<br>
        ${this.props.fromemail}<br>
        ${this.state.company}<br>
        Direct: (516) 656-1474<br>
    </p>
</div>
    `



    dispatchedhtml = `
<div style="margin: 0 5%;">
<div style=" display: flex; flex-direction: column; align-items: center;">
    <h1 style="color: rgba(0, 0, 0, 0.692);">Your Order Has Been Dispatched</h1>
    <br> <br>
    <p style="color: rgba(0, 0, 0, 0.692);">
        ${this.props.fullname},<br><br>

        We are happy to inform you that your shipment from ${this.props.origincity} to ${this.props.destinationcity} has been assigned to a truck. You will be contacted shortly with an estimated pickup and delivery time.
        <br><br>
        Please feel free to call us with any questions!
        <br><br>
        Sincerely,
        <br><br>
        ${this.state.company}
        (516) 656-1474</p>
</div>
</div>
`

    followuphtml = `
<div style="margin: 0 5%;">
<div style=" background-color: rgba(0, 0, 0, 0.048);padding: 20px;">
    <h2 style="color: rgba(0, 0, 0, 0.692);">Sorry we missed you!</h2>
    <br>
    <p>${this.props.fullname}, <br> <br>
        We tried to contact you today to follow up on your requested quote; sorry we missed you! Your custom
        quote is below. Please feel free to contact us with any questions!</p>
</div>
<br>
<div style=" background-color: rgb(1, 10, 59);padding: 20px;display: flex; border-bottom: solid orange 10px;">

    <div style="flex-basis: 50%; display: flex;">
        <p style="color: white;">
            Quote ID: <br>
            Origin:  <br>
            Destination:  <br>
            Vehicle:<br>
            Price: 
        </p>
        <p style="color: white;margin-left: 20px;">

        ${this.props._id}  <br>
        ${this.props.originaddress}<br>
        ${this.props.destinationaddress}<br>
        ${this.props.year} ${this.props.make} ${this.props.model} <br>
        ${this.props.price} $
        </p>

    </div>
    <div style="flex-basis: 50%;">
        <h2 style="color: white;">
            Your Custom Quote</h2>
            <br>
        <p style="color: white;" >
            Your custom price for you shipment from ${this.props.originaddress} to  ${this.props.destinationaddress} is $${this.props.price}. If you have
            any questions, or would like to book your shipment via phone, please feel free to call us at (516)
            656-1474.
            <br>
            <br>

            You may also book your shipment online via the button below.
            <br><br>
            Book Now">Book Online
            Please feel free to contact us with any questions.
            <br><br>
            Sincerely,
            <br><br>
            ${this.state.company}

            <br><br>
            ${this.props.fromemail}
            <br><br>
            (516) 656-1474
        </p>
    </div>
</div>

</div>

`

    orderconfirmationhtml = `
<div style="margin: 0 5%;">
        <div style=" display: flex; flex-direction: column; align-items: center;">
            <h1 style="color: rgba(0, 0, 0, 0.692);">Thank You!</h1>
            <br>
            <p>${this.props.fullname}, <br>

                Thank you for placing your order with SM Transports! </p>
        </div>
        <br>
        <hr>
        <br>
        <div style="display: flex; justify-content: space-between;">
            <p>Door to Door Service</p>
            <p>${this.props.price} $</p>
        </div>
        <br>
        <hr>
        <br>
        <div
            style="padding: 10px 0; display: flex; justify-content: space-between; background-color: rgba(255, 235, 205, 0.712);">
            <p><b>Total</b></p>
            <p style="color: rgb(4, 139, 72);"> ${this.props.price} $</p>
        </div>
        <br>
        <hr>
        <br>
        <h2 style="color: rgba(0, 0, 0, 0.733);">Order Details</h2>
        <br>
        <p style="color: rgba(0, 0, 0, 0.692);">
            Order ID: ${this.props._id} <br>
            ${this.props.year} ${this.props.make} ${this.props.model}<br>
            Origin: ${this.props.origincity}, ${this.props.originstate} ${this.props.originzipcode}<br>
            Destination: ${this.props.destinationcity}, ${this.props.destinationstate} ${this.props.destinationzipcode}<br>
            Available Date: ${this.props.shipdate}<br>
            Carrier Type: Open<br>
            Deposit: $0<br>
            Total Cost: $${this.props.price}<br> <br>
            If you have any questions please feel free to call us!
            <br><br>
            Sincerely,<br><br>
            ${this.props.fromemail}<br>
            ${this.state.company}
            <br>
            Direct: (516) 656-1474<br>
        </p>
    </div>
`

    paymentrecievedhtml = `
<div style="margin: 0 5%;">
<div style=" display: flex; flex-direction: column; align-items: center;">
    <h1 style="color: rgba(0, 0, 0, 0.692);">Thank You!</h1>
    <br> <br>
    <p style="color: rgba(0, 0, 0, 0.692);">
        ${this.props.fullname},<br><br>

        We have received your payment for order number ${this.props._id}.
        <br><br>
        Please contact us at (516) 656-1474 with any questions!
        <br><br>
        Sincerely,
        <br><br>
        ${this.state.company}
        
        (516) 656-1474
</div>
</div>
`

    secondfollowuphtml = `
<div style="margin: 0 5%;">
        <div style=" display: flex; flex-direction: column; align-items: center;">
            <h1 style="color: rgba(0, 0, 0, 0.692);">A quick reminder...</h1>
            <br>
            <p>${this.props.fullname}, <br>

                We are reaching out to you today as a follow up to the quote you 
                requested. Your quote details are listed below. If you have any questions, or would like to
                 place your order, please feel free to contact us at (516) 656-1474. </p>
        </div>
        <br>
        <hr>
        <br>
        <div style="display: flex; justify-content: space-between;">
            <p>Door to Door Service</p>
            <p>${this.props.fullname} $</p>
        </div>
        <br>
        <hr>
        <br>
        <div
            style="padding: 10px 0; display: flex; justify-content: space-between; background-color: rgba(255, 235, 205, 0.712);">
            <p><b>Total</b></p>
            <p style="color: rgb(4, 139, 72);"> ${this.props.fullname} $</p>
        </div>
        <br>
        <hr>
        <br>
        <h2 style="color: rgba(0, 0, 0, 0.733);">Quote Details</h2>
        <br>
        <p style="color: rgba(0, 0, 0, 0.692);">
        Quote ID: ${this.props._id} <br>
        ${this.props.year} ${this.props.make} ${this.props.model}<br>
        Origin: ${this.props.origincity}, ${this.props.originstate} ${this.props.originzipcode}<br>
        Destination: ${this.props.destinationcity}, ${this.props.destinationstate} ${this.props.destinationzipcode}<br>
        Available Date: ${this.props.shipdate}<br>
        Carrier Type: Open<br>
        Deposit: $0<br>
        Total Cost: $${this.props.price}<br> <br>
            If you have any questions please feel free to call us!
            <br><br>
            Sincerely,<br><br>
            ${this.props.fromemail}<br>
        ${this.state.company}
        <br>
            Direct: (516) 656-1474<br>
        </p>
    </div>
`


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

    componentDidMount = () => {

        emailjs.init("ff5wgHH4vSzlFJ0j4");

    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        sendMail: PropTypes.func.isRequired
    }


    onTemplate = (e) => {
        this.setState({ tempselected: e.target.value })
        if (e.target.value === '1') {
            this.setState({ template: this.newquotehtml, subject: "Qoute for Shipment" })
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
        if (subject_check !== '') {
            if (this.props.many) {
                const checkedemail = this.props.checkedemail;
                const checkedids = this.props.checkedids;
                console.log("emails ->", checkedemail)
                console.log("ids ->", checkedids)

                // checkedids.forEach(id => {
                //     checkedemail.forEach(to => {
                //         const mail = {
                //             to,
                //             id,
                //             many: false
                //         }
                //         this.props.sendMail(mail);
                //     })
                // })

            } else {
                const to = this.props.email;
                const id = this.props._id;
                const { user } = this.props.auth;
                const { email, emailpass } = user;
                const subject = this.state.subject;
                const html = this.state.template;

                const mail = {
                    email,
                    emailpass,
                    to,
                    id,

                    subject,
                    html,
                    many: false
                }
                console.log(mail);
                this.props.sendMail(mail);
            }
            this.toggle();
        }

    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <Button onClick={this.toggle} variant='contained'
                    sx={{  fontSize:20, width: 200, height: 56, marginRight: 1, backgroundColor: 'black', borderRadius: 50 }}
                >
                    Send Email
                </Button>
                <Modal
                    open={this.state.open}
                    onClose={this.toggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ overflowX: 'scroll' }}
                >
                    <Box sx={this.style}>
                        {this.state.success ? (<Alert severity="success">This is a success alert — check it out!</Alert>)
                        : null}
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
                                        onChange={this.handleChange}
                                        label="Company"
                                    >
                                        <MenuItem value="SM Transports" >SM Transports</MenuItem>
                                        <MenuItem value="HS Logistics" >HS Logistics</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 500 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Template Name</InputLabel>
                                    <Select
                                        name='company'
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={this.state.template}
                                        onChange={this.onTemplate}
                                        label="Template"

                                    >
                                        <MenuItem value='New Qoute Email'>New Qoute Email</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField

                                    onChange={this.onChange}
                                    name='from'
                                    id="standard-read-only-input"
                                    label="from"
                                    type="text"
                                    variant="standard"
                                    value={user.email}
                                />

                                <Typography variant="h7" component="h2">
                                    To
                                </Typography>

                                <div>
                                    {this.props.checkedemail.map((mail) => (
                                        <div>
                                            <span style={{ fontSize: 14 }}  > {mail} </span>
                                        </div>

                                    ))
                                    }
                                </div>


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

// SendMail.propTypes = {
//     sendMail: PropTypes.func.isRequired,
// }


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { clearErrors })(SendMailM);

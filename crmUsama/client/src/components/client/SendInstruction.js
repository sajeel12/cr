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
     <h3>   this is the instruction for API , make a post request to "http://www.crmsmtransports.site/api/vendor"
      <br>
      your token is <br><br> "  <span style="color:aqua;" > ${this.props.password} </span> "
      </h3> 

    <hr>
      <p>
      
      { <br>
        &emsp;  "token": "${this.props.password}",<br><br>
        &emsp; "fullname": "final format check",<br>
        &emsp; "email": "lahore@bes.com",<br>
        &emsp; "phoneno": "(051) 548712",<br>
        &emsp;  "origincity": "Greenville",<br>
        &emsp;  "originstate": "CA",<br>
        &emsp; "originzipcode": "95947",<br>
        &emsp; "origincountry": "USA",<br>
        &emsp; "destinationcity": "Dallas",<br>
        &emsp;"destinationstate": "TX",<br>
        &emsp;  "destinationzipcode": "75214",<br>
        &emsp; "destinationcountry": "USA",<br>
        &emsp; "shipdate": "11/10/2017",<br> 
        &emsp; "internalnotes": "i am happy",<br>
        &emsp; "transporttype": 2,<br>
        &emsp;"vehicles": [<br>
            &emsp;&emsp; {   <br>
                &emsp;&emsp;&emsp; "isoperable":0,<br>
                &emsp;&emsp;&emsp;   "model": "43sa",<br>
                &emsp;&emsp;&emsp; "make": "suzuki",<br>
                &emsp;&emsp;&emsp; "modelyear": "2012",<br>
                &emsp;&emsp;&emsp; "vehicletype": "suv"<br>
                &emsp;&emsp; },<br>
                &emsp;&emsp; {<br>
                    &emsp;&emsp;&emsp; "isoperable":1,<br>
                    &emsp;&emsp;&emsp; "model": "76g6",<br>
                    &emsp;&emsp;&emsp; "make": "chengan",<br>
                    &emsp;&emsp;&emsp; "modelyear": "2012",<br>
                    &emsp;&emsp;&emsp;"vehicletype": "suv"<br>
                &emsp;&emsp; }<br>
                &emsp;  ]<br>
    }<br><br>
      </p><br>

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

        // this.setState({
        //     open: !this.state.open
        // });
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
                        backgroundColor: this.props.mailsent ? '#F7E771' : '#E8F8F9',
                        color:'#009B9B', 
                        "&:hover":{
                            backgroundColor:'#009B9B',
                            color:'#E8F8F9'
                        },
                        color: this.props.mailsent ? 'black' : '#009B9B',
                        borderRadius: 50
                    }}>
                    {this.props.mailsent ? 'Already Sent  ' : 'Send Instructions'}


                </Button>


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
